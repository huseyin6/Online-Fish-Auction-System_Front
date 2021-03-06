import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fish from '../fish.png';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#3C76C0',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    black: {
      main: '#000000'
    },
    grey: {
      main: '#E1DDE1',
    },
  }
});

function FishermanNavigation() {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    console.log("logged out");
    localStorage.setItem('token', " ");
    navigate("/");
  }

  const fishermanAuctionHandler = async () => {
    navigate("/fisherman/auctions");
  }

  const fishermanSalesHandler = async () => {
    navigate("/fisherman/sales");
  }

  const fishermanFishesHandler = async () => {
    navigate("/fisherman/fishes");
  }

  const fishermanContactHandler = async () => {
    navigate("/fisherman/contact");
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="primary" sx={{ height: '70px' }} >
            <Toolbar>
              <img style={{ marginLeft: "20px", marginTop: "5px", marginBottom: "5px", maxHeight: "60px", maxWidth: "60px" }} src={fish} />
              <Box sx={{ flexGrow: 10, display: { xs: 'none', md: 'flex' }, justifyContent: 'left' }} >
                <Button color="grey" sx={{ m: 2, display: 'block', fontSize: 18 }} onClick={() => { navigate("/customer"); }} >
                  bal??kl??ova deniz ??r??nleri kooperatifi
                </Button>
              </Box>
              <Box sx={{ flexGrow: 10, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around' }} >
                <Button sx={{ m: 2, color: 'white', display: 'block', fontSize: 22 }} onClick={() => { fishermanAuctionHandler(); }}>
                  Mezat
                </Button>
                <Button sx={{ m: 2, color: 'white', display: 'block', fontSize: 22 }} onClick={() => { fishermanSalesHandler(); }}>
                  Sat????lar??m
                </Button>
                <Button sx={{ m: 2, color: 'white', display: 'block', fontSize: 22 }} onClick={() => { fishermanFishesHandler(); }}>
                  Bal??klar??m
                </Button>
                <Button sx={{ m: 2, color: 'white', display: 'block', fontSize: 22 }} onClick={() => { fishermanContactHandler(); }}>
                  ??LET??????M
                </Button>
              </Box>
              <Box sx={{ flexGrow: 10, display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end" }}>
                <Tooltip title="????k???? yap">
                  <IconButton size="large" aria-label="logout" color="inherit" onClick={() => { logoutHandler(); }}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default FishermanNavigation;