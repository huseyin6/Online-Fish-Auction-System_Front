import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CardHeader from '@mui/material/CardHeader';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Stack from '@mui/material/Stack';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect } from 'react';
import CustomerNavigation from '../../components/Navigation/Customer/CustomerNavigation';
import { useLocation, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import axios from '../../axios';
import moment from 'moment';
import 'moment/locale/tr';
import fish from '../../fish.jpg'
import { Navigate } from 'react-router-dom';
import { margin } from '@mui/system';
import ReactPlayer from "react-player";
import io from 'socket.io-client';
import AdminNavigation from '../../components/Navigation/Admin/AdminNavigation';

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
        background: {
            main: '#E1DDE1',
        },
    }
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #3C76C0',
    boxShadow: 24,
    p: 4,
};



function AdminAuctionPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.id;
    const url = location.state.url;

    const [loading, setLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const [fishType, setFishType] = useState('');
    const [fishPrice, setFishPrice] = useState('');
    const [highestBid, setHighestBid] = useState('');
    const [quantity, setQuantity] = useState('');
    const [socket, setSocket] = useState(null);
    const [end, setEnd] = useState(false);

    useEffect(() => {
        const newSocket = io('https://protected-refuge-39487.herokuapp.com/');
        setSocket(newSocket);


        return () => newSocket.close();
    }, [setSocket]);


    const initFishList = () => {
        socket.emit('initFish', { id: "625c23c56ec8d300983bdfee" });

    }


    const nextFish = () => {

        socket.emit('nextFish');

        socket.on('getFishInfo', ({ message }) => {
            console.log(message)

            setFishType(message.fishType);
            setFishPrice(message.initialPrice);
            setQuantity(message.quantity);
        });
        socket.on('bidSuccessful', ({ message, totalBid }) => {
            console.log(message);
            setHighestBid(totalBid);
        });

    };

    const kickCustomer = () => {
        socket.emit('Kick');
    };


    useEffect(() => {

        if (socket) {

            socket.emit('getFishInfoClient', {});
            socket.on('getFishInfo', ({ message }) => {
                console.log(message)
                setFishType(message.fishType);
                setFishPrice(message.initialPrice);
                setQuantity(message.quantity);




            });

            socket.on('bidSuccessful', ({ message, totalBid }) => {
                console.log(message);
                setHighestBid(totalBid);
            });

            socket.on('reset', () => {
                setFishPrice('');


            });

            socket.on('reset2', () => {
                setHighestBid('');


            });

            socket.on('noMore', () => {
                setEnd(true);
            });



        }
    });



    useEffect(() => {

        if (socket && !quantity) {
            console.log("empty");
            socket.emit('getFishInfoClient', {});
            socket.on('getFishInfo', ({ message }) => {
                console.log("message");
                setFishType(message.fishType);
                setFishPrice(message.initialPrice);
                setQuantity(message.quantity);


            });

        }
    });

    const finishAuction = () => {
        setFishPrice('');
        socket.emit(
            'auctionFinished',

        );

        socket.on('informWinner', ({ message }) => {
            console.log(message);
        });
    };

    const handleUpdateAuctionStatusFalse = async (id) => {
        console.log(id);
        try {
            const response = await axios.put(`/auction/getAuctionStatusFalse/${id}`, {
            });
            if (response.status === 200) {
                console.log("status true yapma basarili");
                kickCustomer();
                navigate("/admin");
            } else {
                console.log("status true yapma basarisiz");
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => { });


    function StopAuctionModal() {
        return (
            <div>
                <Modal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="h6" gutterBottom component="div">
                            Mezatı bitirmek istediğinize emin misiniz?
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper'
                            }}
                        >
                            <Button variant="contained" sx={{ mx: 3 }} onClick={() => handleCloseModal()}>Devam Et</Button>
                            <Button variant="outlined" color="error" onClick={() => handleUpdateAuctionStatusFalse(id)}>BİTİR</Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }

    const stopAuctionHandler = () => {

        handleOpenModal();
    }

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
                <AdminNavigation />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <StopAuctionModal />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: "20px"
                }}>
                    <ThemeProvider theme={theme}>
                        <Paper sx={{ width: '60%', overflow: 'hidden' }}>
                            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: "center", my: 2 }}>
                                MEZAT
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                                <ReactPlayer url={url} className='react-player'
                                    playing
                                    width='712px'
                                    height='400px'
                                    volume='0'
                                />
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                                <Card sx={{
                                    width: 400,
                                    maxWidth: '100%',
                                    justifyContent: 'center'
                                }}
                                >
                                    <CardContent sx={{ justifyContent: 'center' }}>
                                        <Typography variant="h6" gutterBottom component="div">Balık Türü: {fishType}</Typography>
                                        <Typography variant="h6" gutterBottom component="div">Balık Miktarı: {quantity} kg</Typography>
                                        {fishPrice && <Typography variant="h6" gutterBottom component="div">Başlangıç Fiyatı: {fishPrice} TL</Typography>}
                                        {highestBid && <Typography variant="h5" gutterBottom component="div">En Yüksek Teklif: {highestBid} TL</Typography>}
                                    </CardContent>
                                    <Divider />
                                    <CardActions sx={{ justifyContent: 'center' }}>
                                        <Button size="large" color="success" variant="contained" disabled={end} onClick={finishAuction}>Satışı Onayla</Button>
                                        <Button size="large" color="success" variant="contained" disabled={end} onClick={nextFish}>DİĞER BALIĞA GEÇ</Button>
                                        <Button variant="contained" color="error" onClick={() => stopAuctionHandler()}>MEZATI BİTİR</Button>
                                    </CardActions>
                                </Card>
                            </Box>
                        </Paper>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}

export default AdminAuctionPage;