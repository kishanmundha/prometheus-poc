import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { WeatherListItem } from './WeatherListItem';
import { getLocations, Location, removeLocation } from '../../utils/data';
import { Header } from './Header';

export const HomePage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const _locations = getLocations();
    setLocations(_locations);
  }, []);

  const handleRemove = useCallback((id: string) => {
    removeLocation(id);
    const _locations = getLocations();
    setLocations(_locations);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden',
      }}
    >
      <Header />
      <Box sx={{ flex: 1, overflow: 'scroll', pb: 2 }}>
        <Box sx={{ py: 2 }}>
          {locations.length === 0 && (
            <Box sx={{ py: 5 }}>
              <Typography variant="h6" color="gray" textAlign="center">
                You don't have any locations yet.
              </Typography>
              <Typography variant="h6" color="gray" textAlign="center">
                Click the button below to add one.
              </Typography>
            </Box>
          )}
          {locations.map(location => (
            <WeatherListItem
              key={location.id}
              location={location}
              onDelete={() => handleRemove(location.id)}
            />
          ))}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="outlined" href="/add" sx={{ px: 16 }}>
            Add new location
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
