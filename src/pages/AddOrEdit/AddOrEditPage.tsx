import { Box } from '@mui/material';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useCallback, useEffect, useState } from 'react';
import { useWeather } from '../../hooks/useWeather';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addLocation,
  getLocation,
  Position,
  updateLocation,
} from '../../utils/data';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { LocationMarker } from './LocationMarker';
import { Header } from './Header';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export const DEFAULT_LATITUDE = 51.500334;
export const DEFAULT_LANGITUDE = -0.085013;
export const DEFAULT_ZOOM = 14;

export const AddOrEditPage: React.FC = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const { data } = useWeather(position);
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      const location = getLocation(params.id);
      if (location) {
        setPosition({ lat: location.lat, lng: location.lng });
      }
    }
  }, [params]);

  const handleSave = useCallback(() => {
    if (!position) {
      return;
    }

    if (!params.id) {
      addLocation({
        lat: position?.lat,
        lng: position?.lng,
        name: data?.timezone || '',
      });
    } else {
      updateLocation(params.id, {
        lat: position?.lat,
        lng: position?.lng,
        name: data?.timezone || '',
      });
    }

    navigate('/');
  }, [navigate, params, position, data]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden',
      }}
    >
      <Header position={position} data={data} onSave={handleSave} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <MapContainer
          center={[DEFAULT_LATITUDE, DEFAULT_LANGITUDE]}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={true}
          style={{ flex: 1 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} />
        </MapContainer>
      </Box>
    </Box>
  );
};
