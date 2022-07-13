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

function CustomerNavigation()
{
    const navigate = useNavigate();

    const logoutHandler = async () => {
        console.log("logged out");
        localStorage.setItem('token', " ");
        navigate("/");
    }

    const customerAuctionHandler = async () => {
        navigate("/customer/auctions");
    }

    const customerTransactionHandler = async () => {
        navigate("/customer/transactions");
    }

    const customerContactHandler = async () => {
        navigate("/customer/contact");
    }

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="primary" sx={{ height: '70px' }} >
                    <Toolbar>
                        <img style={{marginLeft: "20px", marginTop: "5px", marginBottom: "5px", maxHeight: "60px", maxWidth: "60px"}} src={fish} />
                        <Box sx={{ flexGrow: 10, display: { xs: 'none', md: 'flex' }, justifyContent: 'left'}} >
                            <Button color="grey" sx={{ m: 2, display: 'block', fontSize: 18 }} onClick={() => { navigate("/customer"); }} >
                                balıklıova deniz ürünleri kooperatifi
                            </Button>
                        </Box>
                        <Box sx={{ flexGrow: 10, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around'}} >
                            <Button sx={{ m: 2, color: 'white', display: 'block', fontSize: 22 }} onClick={() => { customerAuctionHandler(); }}>
                                Mezat
                            </Button>
                            <Button sx={{ m: 2, color: 'white', display: 'block', fontSize: 22 }} onClick={() => { customerTransactionHandler(); }}>
                                Satın Aldıklarım
                            </Button>
                            <Button sx={{ m: 2, color: 'white', display: 'block', fontSize: 22 }} onClick={() => { customerContactHandler(); }}>
                                İLETİŞİM
                            </Button>
                        </Box>
                        <Box sx={{ flexGrow: 10, display: { xs: 'none', md: 'flex' }, justifyContent: "flex-end" }}>
                            <Tooltip title="Çıkış yap">
                            <IconButton size="large" aria-label="logout" color="inherit" onClick={() => { logoutHandler(); }}>
                                <LogoutIcon />
                            </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}

export default CustomerNavigation;