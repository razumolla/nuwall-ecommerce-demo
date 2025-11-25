"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import type { Libraries } from "@react-google-maps/api";

type LatLngLiteral = google.maps.LatLngLiteral;

const libraries: Libraries = ["places"];

const DEFAULT_CENTER: LatLngLiteral = {
  lat: 12.9716,
  lng: 77.5946,
};

const containerStyle = {
  width: "100%",
  height: "100%",
} as const;

export function TrackOrderMap() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
    libraries,
  });

  // All route points in order → [Start, Stop1, Stop2, ..., End]
  const [stops, setStops] = useState<LatLngLiteral[]>([]);

  // Autocomplete refs
  const [originAC, setOriginAC] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAC, setDestinationAC] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [stopAC, setStopAC] = useState<google.maps.places.Autocomplete | null>(
    null
  );

  // Directions (road path)
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  // Flattened route points from directions.overview_path
  const [routePath, setRoutePath] = useState<LatLngLiteral[]>([]);

  // Rider animation index along routePath
  const [riderIndex, setRiderIndex] = useState(0);

  const center = useMemo<LatLngLiteral>(
    () => stops[stops.length - 1] ?? DEFAULT_CENTER,
    [stops]
  );

  const hasRoute = stops.length >= 2;

  // Whenever stops change, clear old directions & path so a fresh route is computed
  useEffect(() => {
    setDirections(null);
    setRoutePath([]);
    setRiderIndex(0);
  }, [stops]);

  // Helpers
  const extractLocationFromAC = (
    ac: google.maps.places.Autocomplete | null
  ): LatLngLiteral | null => {
    if (!ac) return null;
    const place = ac.getPlace();
    if (!place.geometry || !place.geometry.location) return null;
    return {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
  };

  // helper to flatten overview_path into LatLngLiteral[]
  const extractPathFromDirections = (
    dir: google.maps.DirectionsResult
  ): LatLngLiteral[] => {
    const route = dir.routes?.[0];
    if (!route || !route.overview_path) return [];
    return route.overview_path.map((p) => ({
      lat: p.lat(),
      lng: p.lng(),
    }));
  };

  const handleOriginChanged = () => {
    const loc = extractLocationFromAC(originAC);
    if (!loc) return;

    setStops((prev) => {
      if (prev.length === 0) return [loc];
      return [loc, ...prev.slice(1)];
    });
  };

  const handleDestinationChanged = () => {
    const loc = extractLocationFromAC(destinationAC);
    if (!loc) return;

    setStops((prev) => {
      if (prev.length === 0) return [loc];
      if (prev.length === 1) return [prev[0], loc];
      return [...prev.slice(0, -1), loc];
    });
  };

  const handleStopAdded = () => {
    const loc = extractLocationFromAC(stopAC);
    if (!loc) return;

    setStops((prev) => {
      if (prev.length <= 1) {
        return [...prev, loc];
      }
      return [...prev.slice(0, -1), loc, prev[prev.length - 1]];
    });
  };

  const handleClear = () => {
    setStops([]);
    setDirections(null);
    setRoutePath([]);
    setRiderIndex(0);
  };

  const handleRemoveStop = (index: number) => {
    setStops((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const location: LatLngLiteral = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setStops((prev) => [...prev, location]);
  };

  // Animate rider index along routePath
  useEffect(() => {
    if (!routePath.length) return;

    setRiderIndex(0);

    const interval = window.setInterval(() => {
      setRiderIndex((prev) => {
        if (prev >= routePath.length - 1) return prev; // stop at end
        return prev + 1;
      });
    }, 1000); // speed

    return () => window.clearInterval(interval);
  }, [routePath]);

  if (!googleMapsApiKey) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border text-sm text-gray-500">
        Set{" "}
        <code className="mx-1 font-mono text-xs">
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        </code>{" "}
        in <code className="ml-1 font-mono text-xs">.env.local</code> to load
        the map.
      </div>
    );
  }

  if (loadError) {
    console.error("Google Maps load error", loadError);
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border text-sm text-red-500">
        Failed to load Google Maps. Check API key / billing / Places / Routes
        API.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border text-sm text-gray-500">
        Loading live map…
      </div>
    );
  }

  const progressPercent = hasRoute ? 80 : 25;

  const riderPosition =
    routePath.length > 0
      ? routePath[Math.min(riderIndex, routePath.length - 1)]
      : null;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6">
      {/* Top info bar */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Track your order</h1>
          <p className="text-sm text-gray-500">
            {hasRoute
              ? "Road route with stops"
              : "Set pickup and delivery to build a route"}
          </p>
        </div>
        <div className="rounded-full bg-pink-50 px-4 py-1 text-xs font-medium text-pink-600">
          ETA • 18–25 mins
        </div>
      </div>

      {/* Controls: start / end / stop / clear */}
      <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <Autocomplete
            onLoad={setOriginAC}
            onPlaceChanged={handleOriginChanged}
          >
            <input
              type="text"
              placeholder="Pickup / restaurant (Start)"
              className="h-10 w-full flex-1 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-300"
            />
          </Autocomplete>

          <Autocomplete
            onLoad={setDestinationAC}
            onPlaceChanged={handleDestinationChanged}
          >
            <input
              type="text"
              placeholder="Customer address (End)"
              className="h-10 w-full flex-1 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-300"
            />
          </Autocomplete>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <Autocomplete onLoad={setStopAC} onPlaceChanged={handleStopAdded}>
            <input
              type="text"
              placeholder="Add optional stop (hub / rider change)"
              className="h-10 w-full flex-1 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-300"
            />
          </Autocomplete>

          <button
            type="button"
            onClick={handleClear}
            className="h-10 rounded-xl border border-gray-200 px-4 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:cursor-pointer"
          >
            Clear route
          </button>
        </div>

        <p className="text-[11px] text-gray-400">
          Tip: You can also click on the map to add points. First point becomes
          Start, last point becomes End. Middle points are stops.
        </p>
      </div>

      {/* Map container */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="h-[420px] w-full">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              clickableIcons: false,
            }}
            onClick={handleMapClick}
          >
            {/* Directions (road path) */}
            {hasRoute && !directions && (
              <DirectionsService
                options={{
                  origin: stops[0],
                  destination: stops[stops.length - 1],
                  waypoints: stops.slice(1, -1).map((s) => ({
                    location: s,
                    stopover: true,
                  })),
                  travelMode: google.maps.TravelMode.DRIVING,
                }}
                callback={(result, status) => {
                  console.log("Directions status:", status);
                  if (status === "OK" && result) {
                    setDirections(result);
                    const path = extractPathFromDirections(result);
                    console.log("Path points:", path.length);
                    setRoutePath(path);
                  } else {
                    console.error("Directions request failed:", status, result);
                  }
                }}
              />
            )}

            {directions ? (
              <DirectionsRenderer
                options={{
                  directions,
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: "#EC407A",
                    strokeOpacity: 0.95,
                    strokeWeight: 5,
                  },
                }}
              />
            ) : (
              hasRoute && (
                <Polyline
                  path={stops}
                  options={{
                    strokeColor: "#EC407A",
                    strokeOpacity: 0.6,
                    strokeWeight: 3,
                  }}
                />
              )
            )}

            {/* Fixed point markers (Start / Stops / End) */}
            {stops.map((stop, index) => (
              <Marker
                key={`${stop.lat}-${stop.lng}-${index}`}
                position={stop}
                label={{
                  text:
                    index === 0
                      ? "S"
                      : index === stops.length - 1
                      ? "E"
                      : `${index}`,
                  fontSize: "12px",
                }}
              />
            ))}

            {/* Rider marker – START with label "R" to confirm it shows */}
            {riderPosition && (
              <Marker
                position={riderPosition}
                zIndex={999}
                label={{
                  text: "R",
                  fontSize: "16px",
                  color: "#FF3D57",
                }}
                // Once you see "R", uncomment this and remove label to use the SVG:
                // icon={{
                //   url: "/icons/delivery-bike.svg",
                //   scaledSize: new google.maps.Size(40, 40),
                //   anchor: new google.maps.Point(20, 20),
                // }}
              />
            )}
          </GoogleMap>
        </div>
      </div>

      {/* Bottom status / progress bar */}
      <div className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-medium text-gray-600">
          <span>Order placed</span>
          <span>Preparing</span>
          <span>On the way</span>
          <span>Delivered</span>
        </div>
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-pink-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stops list with remove buttons */}
      {stops.length > 0 && (
        <div className="rounded-2xl bg-white p-4 text-xs text-gray-600 shadow-sm">
          <p className="mb-2 font-medium">Route points:</p>
          <ol className="space-y-1">
            {stops.map((s, i) => (
              <li
                key={`${s.lat}-${s.lng}-${i}`}
                className="flex items-center justify-between gap-2"
              >
                <div>
                  <span className="mr-1 font-semibold">
                    {i === 0
                      ? "Start"
                      : i === stops.length - 1
                      ? "End"
                      : `Stop ${i}`}
                    :
                  </span>
                  {s.lat.toFixed(5)}, {s.lng.toFixed(5)}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveStop(i)}
                  className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] text-gray-500 hover:bg-gray-50"
                >
                  Remove
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

export default TrackOrderMap;
