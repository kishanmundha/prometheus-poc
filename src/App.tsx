import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Root } from './pages';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(20, 121, 255, 1)',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          textTransform: 'none',
        },
      },
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
          <Root />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
