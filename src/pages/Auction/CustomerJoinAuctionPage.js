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
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CustomerNavigation from '../../components/Navigation/Customer/CustomerNavigation';
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


function CustomerJoinAuctionPage() {
    const navigate = useNavigate();
    const customer = JSON.parse(localStorage.getItem('user'));
    const id = customer._id;
    const [loading, setLoading] = useState(false);
    const [customerId, setCustomerId] = useState(id);
    const [username, SetUsername] = useState(customer.username);
    const [sold, setSold] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const [fishType, setFishType] = useState('');
    const [fishPrice, setFishPrice] = useState('');
    const [highestBid, setHighestBid] = useState('');
    const [yourBid, setYourBid] = useState('');
    const [quantity, setQuantity] = useState('');
    const [socket, setSocket] = useState(null);
    const [informWin, setInformWin] = useState('');
    const [end, setEnd] = useState(false);
    const location = useLocation();
    const auctionId = location.state.id;

    const [url, setUrl] = useState("");


    useEffect(() => {
        const newSocket = io('https://protected-refuge-39487.herokuapp.com/');
        setSocket(newSocket);

        return () => newSocket.close();
    }, [setSocket]);

    useEffect(() => {
        handleGetAuctionById(auctionId);
    }, []);

    const placeBid = () => {
        if (highestBid) {
            setYourBid(highestBid + 5)
        } else {
            setYourBid(fishPrice);
        }
        socket.emit('placeBid', {
            bid: 5,
            name: username,
            userId: customerId,

        });
        socket.on('bidSuccessful', ({ message, totalBid }) => {
            console.log(message);
            setHighestBid(totalBid);
        });

        checkWinAuction();

        const customer = JSON.parse(localStorage.getItem('user'));
        const id = customer._id;
        console.log(customer);
        console.log(id);

    };

    useEffect(() => {

        if (socket) {
            socket.on('getFishInfo', ({ message }) => {
                console.log(message)
                setFishType(message.fishType);
                setFishPrice(message.initialPrice);


            });

            socket.on('reset', () => {

                setYourBid('');
                setFishPrice('');
                setSold(true);


            });

            socket.on('reset2', () => {
                setHighestBid('');
                setInformWin('');
                setSold(false);

            });
            socket.on('KickCustomer', () => {
                console.log('kicked');
                setEnd(true);
                setSold(true);
            });


        }
    })

    useEffect(() => {
        if (socket && !quantity) {
            console.log("empty");
            socket.emit('getFishInfoClient');
            socket.on('getFishInfo', ({ message }) => {
                console.log(message)
                setFishType(message.fishType);
                setFishPrice(message.initialPrice);
                setQuantity(message.quantity);
            });
        }
    });


    /*useEffect(()=>{

        if(socket && !quantity){
            console.log("empty");
        socket.emit('getFishInfoClient');
        socket.on('getFishInfo', ({ message }) => { console.log(message) 
            setFishType(message.fishType);
            setFishPrice(message.initialPrice);
            setQuantity(message.quantity);
        
            
            });
        
        }
    }); */

    const checkWinAuction = () => {

        socket.on('informWinner', ({ message }) => {
            setInformWin(message);
            console.log(message, "=========================");

        });
    };


    const handleLeave = () => {
        //TODO
        navigate("/customer");
    }

    function SureToLeaveModal() {
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
                            Mezattan ayrılmak istediğinize emin misiniz?
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
                            <Button variant="contained" sx={{ mx: 3 }} onClick={() => handleCloseModal()}>Kal</Button>
                            <Button variant="outlined" color="error" onClick={() => handleLeave()}>Ayrıl</Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
        )
    }

    const leaveAuctionHandler = () => {
        handleOpenModal();
    }

    const handleGetAuctionById = async (id) => {
        setLoading(true);
        console.log(id);
        console.log("url");
        try {
            console.log("url2");
            const response = await axios.get(`auction/getAuctionById/${id}`);
            if (response.status === 201) {
                console.log("url3");
                let url = response.data.auctionURL;
                console.log("url");
                console.log(url);
                setUrl(url);
            } else {
                console.log("url alinmadi")
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    // const handlegetUrlFromAuctionId = async (id) => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get(`auction/getUrlFromAuctionId/${id}`);
    //         if (response.status === 200) {
    //             let url = response.data
    //             setUrl(url);
    //         }
    //     }
    //     catch (e) {
    //         console.log(e);
    //     }
    //     setLoading(false);

    // }

    return (
        <div style={{
            //backgroundPosition: 'center',
            backgroundSize: 'cover',
            //backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'

        }}>
            <div>
                <CustomerNavigation />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <SureToLeaveModal />
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
                                    width: 300,
                                    maxWidth: '100%',
                                    justifyContent: 'center'
                                }}
                                >
                                    <CardContent sx={{ justifyContent: 'center' }}>
                                        {end ? <Typography variant="h4" gutterBottom component="div">MEZAT BİTTİ</Typography> : (
                                            <>
                                                {informWin && <Typography variant="h4" gutterBottom component="div">{informWin}  </Typography>}
                                                <Typography variant="h6" gutterBottom component="div">Balık Türü: {fishType}  </Typography>
                                                <Typography variant="h6" gutterBottom component="div">Balık Miktarı: {quantity}  kg</Typography>
                                                <Typography variant="h6" gutterBottom component="div">Başlangıç Fiyatı: {fishPrice} TL</Typography>
                                                {highestBid && <Typography variant="h5" gutterBottom component="div">En Yüksek Teklif: {highestBid}  TL</Typography>}
                                                {yourBid && <Typography variant="h6" gutterBottom component="div">Verdiğin Son Teklif: {yourBid} TL</Typography>}
                                            </>
                                        )
                                        }

                                    </CardContent>
                                    <Divider />
                                    <CardActions sx={{ justifyContent: 'center' }}>
                                        <Button color="primary" variant="contained" size="large" disabled={sold} onClick={placeBid}>+5 TL</Button>
                                        <Button variant="outlined" color="error" onClick={() => leaveAuctionHandler()}>Mezattan Ayrıl</Button>
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

export default CustomerJoinAuctionPage;