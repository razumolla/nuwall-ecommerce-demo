// components/track-order/TrackOrderMap.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

type LatLng = google.maps.LatLngLiteral;

// 👉 Example route (your Foodpanda-style path)
const ROUTE_POINTS: LatLng[] = [
  { lat: 12.9716, lng: 77.5946 }, // Restaurant / warehouse
  { lat: 13.0481267, lng: 77.6447893 }, // Mid path (rider moving)
  { lat: 12.9716, lng: 77.5946 }, // Customer
];

const containerStyle = {
  width: "100%",
  height: "100%",
} as const;

const MAP_CENTER: LatLng = ROUTE_POINTS[1] ?? ROUTE_POINTS[0];

// Simple linear interpolation along the route
function interpolatePoint(route: LatLng[], t: number): LatLng {
  if (route.length === 0) throw new Error("No route points defined");
  if (route.length === 1) return route[0];

  const totalSegments = route.length - 1;
  const clamped = Math.min(Math.max(t, 0), 1);
  const scaled = clamped * totalSegments;

  const segIndex = Math.min(Math.floor(scaled), totalSegments - 1);
  const localT = scaled - segIndex;

  const start = route[segIndex];
  const end = route[segIndex + 1];

  return {
    lat: start.lat + (end.lat - start.lat) * localT,
    lng: start.lng + (end.lng - start.lng) * localT,
  };
}

function getStatusLabel(progress: number) {
  if (progress < 0.2) return "Order placed";
  if (progress < 0.45) return "Restaurant is preparing your order";
  if (progress < 0.85) return "Rider is on the way";
  if (progress < 1) return "Almost there";
  return "Delivered";
}

export function TrackOrderMap() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });

  // 0 → start of route, 1 → end of route
  const [progress, setProgress] = useState(0);

  // Fake rider movement along the route (later replace with real API data)
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) return 1;
        return prev + 0.02; // speed
      });
    }, 1500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const riderPosition = useMemo(
    () => interpolatePoint(ROUTE_POINTS, progress),
    [progress]
  );

  // 🔐 Helpful debug log (only in dev):
  if (process.env.NODE_ENV === "development") {
    console.log("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY present?", !!googleMapsApiKey);
  }

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
        Failed to load Google Maps. Check API key / billing / restrictions.
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

  const statusLabel = getStatusLabel(progress);
  const progressPercent = Math.max(8, Math.min(100, progress * 100));

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6">
      {/* Top info bar */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Track your order</h1>
          <p className="text-sm text-gray-500">{statusLabel}</p>
        </div>
        <div className="rounded-full bg-pink-50 px-4 py-1 text-xs font-medium text-pink-600">
          ETA • 18–25 mins
        </div>
      </div>

      {/* Map */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="h-[380px] w-full">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={MAP_CENTER}
            zoom={13}
            options={{
              disableDefaultUI: true,
              clickableIcons: false,
            }}
          >
            {/* Route */}
            <Polyline
              path={ROUTE_POINTS}
              options={{
                strokeColor: "#EC407A",
                strokeOpacity: 1,
                strokeWeight: 4,
              }}
            />

            {/* Restaurant */}
            <Marker
              position={ROUTE_POINTS[0]}
              label={{
                text: "Restaurant",
              }}
            />

            {/* Customer */}
            <Marker
              position={ROUTE_POINTS[ROUTE_POINTS.length - 1]}
              label={{
                text: "You",
              }}
            />

            {/* Rider (moving marker) */}
            <Marker position={riderPosition} />
          </GoogleMap>
        </div>
      </div>

      {/* Bottom status bar */}
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
    </section>
  );
}

export default TrackOrderMap;
