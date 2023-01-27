import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, py: 2 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Prometheus
          </Typography>
          <Typography variant="body1" component="div" sx={{ mt: 1 }}>
            You can add, edit and delete locations
          </Typography>
        </Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 2 }}
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
