import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { WeatherData } from '../../hooks/useWeather';
import { shortLatLng } from '../../utils/common';
import { Position } from '../../utils/data';

interface HeaderProps {
  position: Position | null;
  data?: WeatherData | null;
  onSave: () => void;
}

export const Header: React.FC<HeaderProps> = ({ position, data, onSave }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, py: 2 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Add new Location
          </Typography>
          <Typography variant="body1" component="div" sx={{ mt: 1 }}>
            {Boolean(position) && (
              <>
                <span>{data?.timezone}</span>{' '}
                <span>
                  {shortLatLng(position?.lat)}, {shortLatLng(position?.lng)}
                </span>
              </>
            )}
            &nbsp;
          </Typography>
        </Box>
        {Boolean(position) && (
          <Button color="inherit" onClick={onSave}>
            Save
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
