"use client";

import React, { useMemo, useState } from "react";
import {
  Autocomplete,
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

  // List of stops (origin, waypoints, destination)
  const [stops, setStops] = useState<LatLngLiteral[]>([]);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.Autocomplete | null>(null);

  const center = useMemo<LatLngLiteral>(
    () => stops[stops.length - 1] ?? DEFAULT_CENTER,
    [stops]
  );

  const handlePlaceChanged = () => {
    if (!searchBox) return;
    const place = searchBox.getPlace();
    if (!place.geometry || !place.geometry.location) return;

    const location: LatLngLiteral = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    // Add new stop at the end of the route
    setStops((prev) => [...prev, location]);
  };

  const handleClear = () => {
    setStops([]);
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const location: LatLngLiteral = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setStops((prev) => [...prev, location]);
  };

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
        Failed to load Google Maps. Check API key / billing / Places API.
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

  const progressPercent = 75; // static UI bar for now
  const hasRoute = stops.length >= 2;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6">
      {/* Top info bar */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Track your order</h1>
          <p className="text-sm text-gray-500">
            {hasRoute ? "Route with stops" : "Add locations to create a route"}
          </p>
        </div>
        <div className="rounded-full bg-pink-50 px-4 py-1 text-xs font-medium text-pink-600">
          ETA • 18–25 mins
        </div>
      </div>

      {/* Controls: search + buttons */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
        <Autocomplete
          onLoad={(ac) => setSearchBox(ac)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Search location & add as stop"
            className="h-10 w-full min-w-80 flex-1 rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-300"
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

      {/* Map container */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="h-[380px] w-full">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            options={{
              disableDefaultUI: true,
              clickableIcons: false,
            }}
            onClick={handleMapClick} // also allow adding stops by clicking map
          >
            {/* Polyline route connecting all stops */}
            {hasRoute && (
              <Polyline
                path={stops}
                options={{
                  strokeColor: "#EC407A",
                  strokeOpacity: 1,
                  strokeWeight: 4,
                }}
              />
            )}

            {/* Markers for each stop */}
            {stops.map((stop, index) => (
              <Marker
                key={`${stop.lat}-${stop.lng}-${index}`}
                position={stop}
                label={{
                  text:
                    index === 0
                      ? "Start"
                      : index === stops.length - 1
                      ? "End"
                      : `S${index}`,
                  fontSize: "10px",
                }}
              />
            ))}
          </GoogleMap>
        </div>
      </div>

      {/* Bottom status / progress bar (Foodpanda-style) */}
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

      {/* Optional: show stops list */}
      {stops.length > 0 && (
        <div className="rounded-2xl bg-white p-4 text-xs text-gray-600 shadow-sm">
          <p className="mb-2 font-medium">Route stops:</p>
          <ol className="space-y-1">
            {stops.map((s, i) => (
              <li key={`${s.lat}-${s.lng}-${i}`}>
                <span className="mr-1 font-semibold">
                  {i === 0
                    ? "Origin"
                    : i === stops.length - 1
                    ? "Destination"
                    : `Stop ${i}`}
                  :
                </span>
                {s.lat.toFixed(5)}, {s.lng.toFixed(5)}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

export default TrackOrderMap;
