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
import { useNavigate } from 'react-router-dom';
import CustomerNavigation from '../CustomerNavigation';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import axios from '../../../../axios';
import moment from 'moment';
import 'moment/locale/tr';
import fish from "../../../../fish.jpg";
import { Navigate } from 'react-router-dom';

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

function CustomerAuctionPage() {
    const navigate = useNavigate();

    const [isAuctionActive, setIsAuctionActive] = useState(false);
    const [selectedAuctionId, setSelectedAuctionId] = useState();
    const [upcomingAuctionArray, setUpcomingAuctionArray] = useState([]);

    const [openFishModal, setOpenFishModal] = useState(false);
    const handleOpenFishModal = () => setOpenFishModal(true);
    const handleCloseFishModal = () => setOpenFishModal(false) && setSelectedAuctionId("");

    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState();
    const [alertContent, setAlertContent] = useState("");
    const [loading, setLoading] = useState(false);

    const [allFishArray, setAllFishArray] = useState([]);

    const [fishOfAuc, setFishOfAuc] = useState([]);
    const [fishSpecificAuction, setFishSpecificAuction] = useState([]);


    const handleGetAllFish = async () => {
        setLoading(true);
        try {
            const response = await axios.get('fish/getAllFish');
            if (response.status === 201) {
                let temp = response.data;
                let arr = [];
                let foa = [];
                for (let i = 0; i < temp.length; i++) {
                    if (!temp[i].auctionId) {
                        let item = {
                            id: temp[i]._id,
                            fishermanId: temp[i].fishermanId ? temp[i].fishermanId._id : "-",
                            displayLabel: "Tür: " + temp[i].fishType + " - Miktar: " + temp[i].quantity + " kg - Başlangıç fiyatı: " + temp[i].initialPrice + " tl",
                            creationDate: temp[i].createdAt ? moment(temp[i].createdAt).format('LLL') : "Girilmedi",
                            updateDate: temp[i].updatedAt ? moment(temp[i].updatedAt).format('LLL') : "Güncellenmedi",
                            buNeBilmiyom: temp[i].__v // TODO
                        }
                        arr.push(item);
                    } else {
                        let item = {
                            id: temp[i]._id,
                            auctionId: temp[i].auctionId._id,
                            fishermanId: temp[i].fishermanId ? temp[i].fishermanId._id : "-",
                            displayLabel: "Tür: " + temp[i].fishType + " - Miktar: " + temp[i].quantity + " kg - Başlangıç fiyatı: " + temp[i].initialPrice + " tl",
                            creationDate: temp[i].createdAt ? moment(temp[i].createdAt).format('LLL') : "Girilmedi",
                            updateDate: temp[i].updatedAt ? moment(temp[i].updatedAt).format('LLL') : "Güncellenmedi",
                            buNeBilmiyom: temp[i].__v // TODO
                        }
                        foa.push(item);
                    }
                }
                setFishOfAuc(foa);
                setAllFishArray(arr);
            } else {
                console.log('failed');
            }
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);

    };

    useEffect(() => {
        handleGetAllFish();
    }, []);

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

    function DisplayFishModal() {
        return (
            <div>
                <Modal
                    open={openFishModal}
                    onClose={handleCloseFishModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Stack spacing={2}>
                            <Typography variant="h6" gutterBottom component="div">Balıklar</Typography>
                            {fishSpecificAuction.map((fish) => {
                                return <Typography>{fish.displayLabel}</Typography>
                            })}
                        </Stack>
                    </Box>
                </Modal>
            </div>
        );
    }

    const handleGetUpcomingAuctions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/auction/getUpcomingAuctions');
            console.log(response);
            if (response.status === 201) {
                let temp = response.data.auction;
                let arr = [];
                //console.log(response.data.auction);
                for (let i = 0; i < temp.length; i++) {
                    let item = {
                        id: temp[i]._id,
                        auctionDate: temp[i].auctionDate ? moment(temp[i].auctionDate).format('LLL') : "Girilmedi",
                        creationDate: temp[i].createdAt ? moment(temp[i].createdAt).format('LLL') : "Girilmedi",
                        updateDate: temp[i].updatedAt ? moment(temp[i].updatedAt).format('LLL') : "Güncellenmedi",
                        buNeBilmiyom: temp[i].__v,
                        auctionStatus: temp[i].auctionStatus
                    };
                    arr.push(item);
                }
                setUpcomingAuctionArray(arr);
                console.log(upcomingAuctionArray);
            } else {
                console.log('failed');
            }
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleGetUpcomingAuctions();
    }, []);

    const handleJoinAuction = (id) => {
        setSelectedAuctionId(id)
        navigate("/customer/auction-page", { state: { id: id, } });
    };

    function DisplayFishesofAuctionButton(props) {
        return (
            <Button size="medium" color="primary" onClick={props.click}>Balıkları Gör</Button>
        );
    }

    const handleDisplay = (id) => {
        let temp = [];
        for (let i = 0; i < fishOfAuc.length; i++) {
            if (fishOfAuc[i].auctionId === id) {
                temp.push(fishOfAuc[i]);
            }
        }
        setFishSpecificAuction(temp);
        handleOpenFishModal();
    }

    const closeAlert = async () => {
        setAlert(false);
    };

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
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <DisplayFishModal />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: "50px"
                }}>
                    <ThemeProvider theme={theme}>
                        <Paper sx={{ width: '80%', overflow: 'hidden' }}>
                            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: "center", my: 2 }} color="primary">
                                Mezatlar
                            </Typography>
                            <TableContainer sx={{ maxHeight: 700 }}>
                                <Table stickyHeader sx={{ minWidth: 1000 }} aria-label="prev auction table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>Mezat Tarihi</TableCell>
                                            <TableCell align='center'>Eklenme Tarihi</TableCell>
                                            <TableCell align='center'></TableCell>
                                            <TableCell align='center'></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {upcomingAuctionArray.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{row.auctionDate}</TableCell>
                                                <TableCell align="center">{row.creationDate}</TableCell>
                                                <TableCell align="center">

                                                    <DisplayFishesofAuctionButton click={() => handleDisplay(row.id)} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.auctionStatus ? <Button size="medium" variant="contained" color="primary" onClick={() => handleJoinAuction(row.id)}>Mezata Katıl</Button> :
                                                        <Button disabled size="medium" variant="contained" color="primary" onClick={() => handleJoinAuction(row.id)}>Mezat Başlamadı</Button>}

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </ThemeProvider>
                </div>

            </div>
        </div>
    );
}

export default CustomerAuctionPage;