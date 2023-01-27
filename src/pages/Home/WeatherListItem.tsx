import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WindArrowIcon from '@mui/icons-material/CallMade';
import { useWeather } from '../../hooks/useWeather';
import { Location } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { fahToCel, shortLatLng } from '../../utils/common';

interface WeatherListItemProps {
  location: Location;
  onDelete: () => void;
}

export const WeatherListItem: React.FC<WeatherListItemProps> = ({
  location,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { data } = useWeather({ lat: location.lat, lng: location.lng });

  const handleEdit = () => {
    navigate(`/edit/${location.id}`);
  };

  return (
    <Box
      key={location.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        m: 2,
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            py: 2,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 1,
              backgroundColor: 'rgba(20, 165, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            color="primary.light"
          >
            {Boolean(data) && (
              <Typography>
                {fahToCel(data?.currently?.temperature)}’C
              </Typography>
            )}
          </Box>
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="h6">
              {location.name} {shortLatLng(location.lat)},{' '}
              {shortLatLng(location.lng)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 'bold' }}
              color="gray"
            >
              {data?.currently?.summary}
            </Typography>
            <Typography variant="body2" color="gray">
              {data?.minutely?.summary || data?.hourly?.summary}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ py: 2 }}>
          <ActionButton onEdit={handleEdit} onDelete={onDelete} />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          background: 'rgba(248, 249, 253, 1)',
          p: 1,
          color: 'gray',
        }}
      >
        {Boolean(data) && (
          <>
            <Box sx={{ mr: 4 }}>
              <Typography variant="body2">
                Wind Speed&nbsp;&nbsp;
                <WindArrowIcon sx={{ width: 16, height: 16, mb: -0.3 }} />
                &nbsp;&nbsp;
                {data?.currently?.windSpeed} KM/H
              </Typography>
            </Box>
            <Box sx={{ mr: 4 }}>
              <Typography variant="body2">
                Humidity {data?.currently?.humidity}
              </Typography>
            </Box>
          </>
        )}
        <Typography variant="body2">&nbsp;</Typography>
      </Box>
    </Box>
  );
};

interface ActionButtonProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = props => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    if (window.confirm('Do you want to delete this location?')) {
      props.onDelete();
    }
  };

  return (
    <>
      <ButtonGroup variant="contained" ref={anchorRef}>
        <Button onClick={props.onEdit} sx={{ px: 4 }}>
          Edit
        </Button>
        <Button
          size="small"
          onClick={handleToggle}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="menu"
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  <MenuItem onClick={handleDelete}>
                    <Typography color="red">Delete</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
