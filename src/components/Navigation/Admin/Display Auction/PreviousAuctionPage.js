import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect } from 'react';
import AdminNavigation from '../AdminNavigation';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import axios from '../../../../axios';
import moment from 'moment';
import 'moment/locale/tr';
import fish from "../../../../fish.jpg";
import Stack from '@mui/material/Stack';


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

function PreviousAuctionPage() {
    const [prevAuctionArray, setPrevAuctionArray] = useState([]);

    const [selectedAuctionId, setSelectedAuctionId] = useState();

    const [allSaleArray, setAllSaleArray] = useState([]);

    const [saleOfAuc, setSaleOfAuc] = useState([]);
    const [saleSpecificAuction, setSaleSpecificAuction] = useState([]);

    const [openSaleModal, setOpenSaleModal] = useState(false);
    const handleOpenSaleModal = () => setOpenSaleModal(true);
    const handleCloseSaleModal = () => setOpenSaleModal(false) && setSelectedAuctionId("");

    useEffect(() => {
        handleGetSales('623f54f7bd331c3465926fd3'); //TODO
    }, []);

    const handleGetPreviousAuctions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/auction/getPreviousAuctions');
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
                        buNeBilmiyom: temp[i].__v
                    };
                    arr.push(item);
                }
                setPrevAuctionArray(arr);
            } else {
                console.log('failed');
            }
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleGetPreviousAuctions();
    }, []);

    function DisplaySales(props) {
        return (
            <Button size="medium" color="primary" onClick={props.click}>Satışlar</Button>
        );
    }

    const handleDisplay = (id) => {
        let temp = [];
        for (let i = 0; i < saleOfAuc.length; i++) {
            temp.push(saleOfAuc[i]);
        }
        setSaleSpecificAuction(temp);
        handleOpenSaleModal();
    }

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

    const handleGetSales = async (id) => {
        setLoading(true);
        try {
            const response = await axios.get(`sale/getSalesByCustomerId/${id}`);
            if (response.status === 200) {
                let temp = response.data;
                console.log(temp);
                let arr = [];
                let foa = [];
                for (let i = 0; i < temp.length; i++) {
                    if (!temp[i].auctionId) {
                        let item = {
                            displayLabel: "Tür: " + temp[i]._id + " - Miktar: " + temp[i].fishId + " kg ",
                        }
                        arr.push(item);
                    } else {
                        let item = {
                            displayLabel: "Tür: " + temp[i]._id + " - Miktar: " + temp[i].fishId + " kg ",

                        }
                        foa.push(item);
                    }
                }
                setSaleOfAuc(foa);
                setAllSaleArray(arr);
            } else {
                console.log('failed');
            }
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    function DisplaySaleModal() {
        return (
            <div>
                <Modal
                    open={openSaleModal}
                    onClose={handleCloseSaleModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Stack spacing={2}>
                            <Typography variant="h6" gutterBottom component="div">Satışlar</Typography>
                            {saleSpecificAuction.map((fish) => {
                                return <Typography>{fish.displayLabel}</Typography>
                            })}
                        </Stack>
                    </Box>
                </Modal>
            </div>
        );
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
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <DisplaySaleModal />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: "50px"
                    }}>
                        <ThemeProvider theme={theme}>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: "center", my: 3 }} color="primary">
                                    Geçmiş Tarihli Mezatlar
                                </Typography>
                                <TableContainer sx={{ maxHeight: 700 }}>
                                    <Table stickyHeader sx={{ minWidth: 1000 }} aria-label="prev auction table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center'>Mezat Tarihi</TableCell>
                                                <TableCell align='center'>Eklenme Tarihi</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {prevAuctionArray.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{row.auctionDate}</TableCell>
                                                    <TableCell align="center">{row.creationDate}</TableCell>
                                                    <TableCell align="center">

                                                        <DisplaySales click={() => handleDisplay(row.id)} />
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
        </div>
    );
}
export default PreviousAuctionPage;