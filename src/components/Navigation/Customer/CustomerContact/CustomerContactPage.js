import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CustomerNavigation from '../CustomerNavigation';
import { alpha } from '@mui/material';
import 'moment/locale/tr';
import fish from "../../../../fish.jpg";

import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#3C76C0',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        white: {
            main: '#FFFFFF'
        },
        grey: {
            main: '#E1DDE1',
        },
    }
});

function CustomerContactPage() {
    return (
        <div style={{
            backgroundImage: `url(${fish})`,
            //backgroundPosition: 'center',
            backgroundSize: 'cover',
            //backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'

        }}>
            <div>
                <CustomerNavigation />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <ThemeProvider theme={theme}>
                        <Card sx={{
                            width: 600,
                            maxWidth: '100%',
                            marginTop: '5%',
                            backgroundColor: alpha(theme.palette.background.paper, 0.75)
                        }}
                        >
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" color="primary" sx={{ textAlign: 'center', m: 1 }}>
                                    Balıklıova Deniz Ürünleri Kooperatifi
                                </Typography>
                            </CardContent>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <PhoneIcon fontSize="large" />
                                <Typography gutterBottom variant="h6" component="div" mt={1} ml={2}>
                                    0(232) 232 2332
                                </Typography>
                            </CardContent>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <LocationOnIcon fontSize="large" />
                                <Typography gutterBottom variant="h6" component="div" mt={1} ml={2}>
                                    Balıklıova, 13009. Sk. No:46, 35430 Urla/İzmir
                                </Typography>
                            </CardContent>
                        </Card>
                    </ThemeProvider>
                </div>
            </div>

        </div>
    );
}

export default CustomerContactPage;