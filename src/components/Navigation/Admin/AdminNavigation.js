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




function AdminNavigation()
{
    
    const navigate = useNavigate();

    const logoutHandler = async () => {
        console.log("logged out");
        localStorage.setItem('token', " ");
        navigate("/");
    }

    const upcomingAuctionHandler = async () => {
        navigate("/admin/upcoming-auctions");
    }
    
    const addFishHandler = async  () => {
        navigate("/admin/add-fish");
    }

    const addAuctionHandler = async () => {
        navigate("/admin/add-auction");
    }

    const previousAuctionHandler = async () => {
        navigate("/admin/previous-auctions");
    }

    const registerFishermanHandler = async () => {
        navigate("/admin/register-fisherman");
    }

    const displayFishHandler = async () => {
        navigate("/admin/all-fish");
    }


    const auctionFunctions = [addAuctionHandler, upcomingAuctionHandler, previousAuctionHandler];
    const auctionFunctionNames = ["Mezat Ekle", "Gelecek Tarihli Mezatlar", "Geçmiş Mezatlar"];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenAuctionMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseAuctionMenu = () => {
        setAnchorElNav(null);
    };

    return(
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="primary" sx={{ height: '70px' }} >
                    <Toolbar>
                        <img style={{marginLeft: "20px", marginTop: "5px", marginBottom: "5px", maxHeight: "60px", maxWidth: "60px"}} src={fish} />
                        <Box sx={{ flexGrow: 10, display: { xs: 'none', md: 'flex' }, justifyContent: 'left'}} >
                            <Button color="grey" sx={{ m: 2, display: 'block', fontSize: 18 }} onClick={() => { navigate("/admin"); }} >
                                balıklıova deniz ürünleri kooperatifi
                            </Button>
                            <Menu
                                sx={{ mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseAuctionMenu}
                                >
                                <MenuItem onClick={() => { addAuctionHandler(); }}>Mezat Ekle</MenuItem>
                                <MenuItem onClick={() => { upcomingAuctionHandler(); }}>Gelecek Tarihli Mezatlar</MenuItem>
                                <MenuItem onClick={() => { previousAuctionHandler(); }}>Geçmiş Mezatlar</MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 10, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around'}} >
                            <Button onClick={handleOpenAuctionMenu} sx={{ m: 2, color: 'white', display: 'block', fontSize: 22 }} >
                                Mezat
                            </Button>
                            <Button sx={{ m: 2, color: 'white', display: 'block', fontSize: 22 }} onClick={() => { displayFishHandler(); }}>
                                balıklar
                            </Button>
                            <Button sx={{ m: 2, color: 'white', display: 'block', fontSize: 22 }} onClick={() => { addFishHandler(); }}>
                                balık ekle
                            </Button>
                            <Button sx={{ m: 2, color: 'white', display: 'block', fontSize: 22 }} onClick={() => { registerFishermanHandler(); }}>
                                balıkçı ekle
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

export default AdminNavigation;