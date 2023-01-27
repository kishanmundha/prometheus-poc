import { useEffect } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';

interface LocationMarkerProps {
  position: LatLngLiteral | null;
  setPosition: (position: LatLngLiteral | null) => void;
}

export const LocationMarker: React.FC<LocationMarkerProps> = props => {
  const { position, setPosition } = props;

  const map = useMapEvents({
    click(e) {
      map.locate();
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  useEffect(() => {
    if (position) {
      map.panTo([position.lat, position.lng]);
    }
  }, [position, map]);

  return position === null ? null : <Marker position={position}></Marker>;
};
