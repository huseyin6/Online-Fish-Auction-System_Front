import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import AdminNavigation from '../AdminNavigation';
import axios from '../../../../axios';
import moment from 'moment';
import 'moment/locale/tr';

import fish from "../../../../fish.jpg";

moment.locale('tr')

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
        }
    }
});

function AddAuctionPage() {

    const [auctionDate, setAuctionDate] = useState(null);
    const [auctionTime, setAuctionTime] = useState(null);



    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState();
    const [alertContent, setAlertContent] = useState("");
    const [loading, setLoading] = useState(false);


    /*
    const handleDate = (newValue) => {
        setAuctionDate(moment(newValue).format('YYYY-MM-DD'));
        //setFinalDate(moment(auctionDate + " " + auctionTime).format('YYYY-MM-DD HH:mm'));
    };

    const handleTime = (newValue) => {
        setAuctionTime(moment(newValue).format('HH:mm'));
        //setFinalDate(moment(auctionDate + " " + auctionTime).format('YYYY-MM-DD HH:mm'));
    };
    */

    const closeAlert = async () => {
        setAlert(false);
    };

    const handleCreateAuction = async (someDate) => {
        console.log(someDate);
        setLoading(true);
        try {
            const response = await axios.post('/auction/createAuction', {
                ...someDate
            });
            if (response.status === 201) {
                setAlertContent("Mezat başarıyla eklendi");
                setAlertType(true);
                setAlert(true);
            } else {
                setAlertContent("Mezat eklenemedi");
                setAlertType(false);
                setAlert(true);
            }
        }
        catch (e) {
            console.log(e);
            setAlertContent("Mezat eklenemedi");
            setAlertType(false);
            setAlert(true);
        }
        setLoading(false);
    }

    const addAuctionHandler = async () => {
        let body = {
            auctionDate: moment(auctionDate).format('YYYY-MM-DD') + " " + moment(auctionTime).format('HH:mm')
        };
        handleCreateAuction(body);
        setAuctionDate(null);
        setAuctionTime(null);
    }

    const handleAddDate = (newTime) => {
        console.log(newTime);
        setAuctionDate(newTime);
    };

    const handleAddTime = (newTime) => {
        setAuctionTime(newTime);
    };


    return (
        <div style={{
            backgroundImage: `url(${fish})`,
            backgroundSize: 'cover',
            width: '100vw',
            height: '100vh'

        }}>
            <div>
                <AdminNavigation />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Box sx={{ display: 'flex', justifyContent: 'center', m: 5 }}>
                    {alert ?
                        (alertType ?
                            (<Alert onClose={() => { closeAlert() }} variant="filled" severity="success" sx={{ width: "15%" }}>{alertContent}</Alert>)
                            : (<Alert onClose={() => { closeAlert() }} variant="filled" severity="error" sx={{ width: "13%" }}>{alertContent}</Alert>))
                        : <></>}
                </Box>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <ThemeProvider theme={theme}>
                        <Card sx={{
                            width: 400,
                            maxWidth: '100%'
                        }}
                        >
                            <CardHeader title="Mezat Ekle" sx={{ textAlign: 'center', m: 1 }} />
                            <Box sx={{ justifyContent: 'center' }}>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <CardContent>
                                        <DatePicker
                                            label="Mezat Tarihi"
                                            value={auctionDate}
                                            onChange={handleAddDate}
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />
                                    </CardContent>
                                    <CardContent>
                                        <TimePicker
                                            label="Mezat Saati"
                                            value={auctionTime}
                                            onChange={handleAddTime}
                                            renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
                                        />
                                    </CardContent>
                                </LocalizationProvider>
                            </Box>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Button size="large" variant="contained" color="primary" onClick={() => { addAuctionHandler(); }}>Ekle</Button>
                            </CardActions>
                        </Card>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}

export default AddAuctionPage;