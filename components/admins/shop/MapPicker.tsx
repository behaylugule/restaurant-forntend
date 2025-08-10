// components/MapPicker.tsx
"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useMapPicker } from "../../../hook/useMapPicker";
import L from "leaflet";

type MapPickerProps = {
  value?: [number, number];
  onChange: (pos: [number, number]) => void;
};

const MapClickHandler = ({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
};

export default function MapPicker({ value, onChange }: MapPickerProps) {
  const { position, handleMapClick } = useMapPicker(value || [9.03, 38.74]);

  const onMapClick = (lat: number, lng: number) => {
    handleMapClick(lat, lng);
    onChange([lat, lng]);
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler onSelect={onMapClick} />
      <Marker
        position={position}
        icon={L.icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })}
      />
    </MapContainer>
  );
}
