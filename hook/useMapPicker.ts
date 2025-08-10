// hooks/useMapPicker.ts
import { useState } from 'react';

export function useMapPicker(defaultPosition: [number, number] = [9.03, 38.74]) {
  const [position, setPosition] = useState<[number, number]>(defaultPosition);

  const handleMapClick = (lat: number, lng: number) => {
    setPosition([lat, lng]);
  };

  return {
    position,
    setPosition,
    handleMapClick,
  };
}