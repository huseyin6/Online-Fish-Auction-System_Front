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
import AdminNavigation from '../AdminNavigation';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import axios from '../../../../axios';
import moment from 'moment';
import 'moment/locale/tr';
import fish from "../../../../fish.jpg";
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
    }
});



function UpcomingAuctionPage() {
    const navigate = useNavigate();

    const [selectedAuctionId, setSelectedAuctionId] = useState("");
    const [upcomingAuctionArray, setUpcomingAuctionArray] = useState([]);

    const [openUrlModal, setOpenUrlModal] = useState(false);
    const handleOpenUrlModal = (a) => {
        setOpenUrlModal(true);
        setAuctionId(a);
    }
    const handleCloseUrlModal = () => setOpenUrlModal(false);
    const [url, setUrl] = useState("");

    const [auctionId, setAuctionId] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false) && setSelectedAuctionId("");

    const [openFishModal, setOpenFishModal] = useState(false);
    const handleOpenFishModal = () => setOpenFishModal(true);
    const handleCloseFishModal = () => setOpenFishModal(false) && setSelectedAuctionId("");

    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState();
    const [alertContent, setAlertContent] = useState("");
    const [loading, setLoading] = useState(false);

    const [fishesBody, setFishesBody] = useState([]);

    const [selectedFish, setSelectedFish] = useState([]);


    const [isAuctionDeleted, setIsAuctionDeleted] = useState(false);

    const [isFishAdded, setIsFishAdded] = useState(false);

    const [allFishArray, setAllFishArray] = useState([]);

    const [fishOfAuc, setFishOfAuc] = useState([]);
    const [fishSpecificAuction, setFishSpecificAuction] = useState([]);

    const [deleteAlert, setDeleteAlert] = useState(false);
    const [deleteAlertType, setDeleteAlertType] = useState();
    const [deleteAlertContent, setDeleteAlertContent] = useState("");


    const closeDeleteAlert = async () => {
        setDeleteAlert(false);
    };


    const handleAddUrlToAuction = async (body) => {
        const id = body.id;
        setLoading(true);
        console.log(body.auctionURL);
        let body2 = {
            auctionURL: body.auctionURL
        }
        console.log(body2.auctionURL);
        console.log(id);
        try {
            //TODO
            const response = await axios.put(`auction/addURLToAuction/${id}`, {
                ...body2
            }
            );
            console.log(response);
            if (response.status === 201) {
                console.log('url eklendi');
            } else {
                console.log('url eklenemedi');
            }
        }
        catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

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
    }, [isFishAdded]);


    /*
    const handleGetAuctionWithFishes = async () => {
        try {
          const response = await axios.get('/auction/getAuctionByIdWithFish', {
            params: selectedAuctionId
          });
          console.log(response);
          if (response.status === 200) {
            console.log(response.data);
          } else {
            console.log('failed');
          }
        }
        catch (e) {
          console.log(e);
        }
    };
    */


    const handleAddFishToAuction = async (body) => {
        setLoading(true);
        try {
            const response = await axios.put('/auction/addFishToAuction', {
                ...body
            }
            );
            console.log(response);
            if (response.status === 201) {
                //console.log(response.data);
                setAlertContent("Balık başarıyla eklendi");
                setIsFishAdded(!isFishAdded);
                setAlertType(true);
                setAlert(true);
            } else {
                //console.log('failed');
                setAlertContent("Balık eklenemedi");
                setAlertType(false);
                setAlert(true);
            }
        }
        catch (e) {
            console.log(e);
            setAlertContent("Balık eklenemedi");
            setAlertType(false);
            setAlert(true);
        }
        setLoading(false);
    };

    const handleAddFishesToAuction = async (body) => {
        setLoading(true);
        try {
            const response = await axios.put('/auction/addFishesToAuction', {
                ...body
            }
            );
            console.log(response);
            if (response.status === 200) {
                //console.log(response.data);
                setAlertContent("Balıklar başarıyla eklendi");
                setIsFishAdded(!isFishAdded);
                setAlertType(true);
                setAlert(true);
            } else {
                //console.log('failed');
                setAlertContent("Balıklar eklenemedi");
                setAlertType(false);
                setAlert(true);
            }
        }
        catch (e) {
            console.log(e);
            setAlertContent("Balıklar eklenemedi");
            setAlertType(false);
            setAlert(true);
        }
        setLoading(false);
    }
    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };
    // const addFishHandler = async () => {
    //     console.log(selectedFish);
    //     if (selectedFish.length > 1) {
    //         let arr = [];
    //         for (let i = 0; i < selectedFish.length; i++) {
    //             let item = {
    //                 fishId: selectedFish[i].id,
    //                 auctionId: selectedAuctionId
    //             }
    //             arr.push(item)
    //         }
    //         setFishesBody(arr);
    //         handleAddFishesToAuction(addFishesToAuctionBody);
    //     } else {
    //         let body = {
    //             "fishId": selectedFish[0].id,
    //             "auctionId": selectedAuctionId
    //         };
    //         handleAddFishToAuction(body);
    //     }

    //     handleCloseModal();
    //     setSelectedFish([]);

    // }

    async function addFishHandler() {
        console.log(selectedFish);
        if (selectedFish.length > 1) {
            let arr = [];
            for (let i = 0; i < selectedFish.length; i++) {
                let item = {
                    fishId: selectedFish[i].id,
                    auctionId: selectedAuctionId
                };
                arr.push(item);
            }
            const addFishesToAuctionBody = {
                fishes: arr
            };
            //setFishesBody(arr);
            handleAddFishesToAuction(addFishesToAuctionBody);
        } else {
            let body = {
                "fishId": selectedFish[0].id,
                "auctionId": selectedAuctionId
            };
            handleAddFishToAuction(body);
        }

        handleCloseModal();
        setSelectedFish([]);

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

    function AddUrlModal(id) {
        return (
            <div>
                <Modal
                    open={openUrlModal}
                    onClose={handleCloseUrlModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Card sx={{ style }}>
                            <CardHeader title="Youtube Url Ekle" sx={{ textAlign: 'center', m: 1 }} />
                            <CardContent>
                                <TextField
                                    id="outlined-name"
                                    label="Url"
                                    value={url}
                                    onChange={handleUrlChange}
                                />
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Button size="large" variant="contained" color="primary" onClick={() => {
                                    let UrlToAuctionBody = {
                                        id: id.id,
                                        auctionURL: url
                                    };
                                    handleAddUrlToAuction(UrlToAuctionBody);
                                    handleUpdateAuctionStatusTrue(id.id, url);
                                    console.log(id.id);
                                }}>Ekle</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Modal>
            </div>
        );
    }

    function AddFishModal() {
        return (
            <div>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Card sx={{ style }}>
                            <CardHeader title="Balık Ekle" sx={{ textAlign: 'center', m: 1 }} />
                            <CardContent>
                                <Autocomplete
                                    multiple
                                    fullWidth
                                    id="fishID"
                                    value={selectedFish}
                                    options={allFishArray}
                                    getOptionLabel={(option) => option.displayLabel}
                                    defaultValue={undefined}
                                    onChange={(event, values) => setSelectedFish(values)}
                                    renderInput={(params) => <TextField {...params} variant="standard" label="Balıklar" placeholder="Balık" />}
                                />
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Button size="large" variant="contained" color="primary" onClick={() => { addFishHandler(); }}>Ekle</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Modal>
            </div>
        );
    }

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

    // const handleStartAuction = (id) => {
    //     console.log(id);

    //     console.log(selectedAuctionId , "select");
    //     initFishList(id);
    //     socket.on('navigate' ,()=>{navigate("/admin/auction-page");} );
    //     socket.on('error' , ()=>{console.log("error ");})


    // }

    const handleUpdateAuctionStatusTrue = async (id, url) => {
        try {
            const response = await axios.put(`/auction/getAuctionStatusTrue/${id}`, {
            });
            if (response.status === 200) {
                console.log("status true yapma basarili");
                initFishList(id);
                socket.on('navigate', () => { navigate("/admin/auction-page", { state: { id: id, url: url } }); });
                socket.on('error', () => { console.log("error "); })
            } else {
                console.log("status true yapma basarisiz");
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleDeleteAuctions = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`/auction/deleteAuction/${id}`, {
            });
            if (response.status === 200) {
                setIsAuctionDeleted(!isAuctionDeleted);
                setDeleteAlertContent("Mezat başarıyla silindi");
                setDeleteAlertType(true);
                setDeleteAlert(true);
            } else {
                setDeleteAlertContent("Mezat silinemedi");
                setDeleteAlertType(false);
                setDeleteAlert(true);
            }
        } catch (e) {
            console.log(e);
            setDeleteAlertContent("Mezat silinemedi");
            setDeleteAlertType(false);
            setDeleteAlert(true);
        }
        setLoading(false);

    }

    const handleGetUpcomingAuctions = async () => {
        try {
            const response = await axios.get('/auction/getUpcomingAuctions');
            console.log(response);
            if (response.status === 201) {
                let temp = response.data.auction;
                let arr = [];
                //console.log(response.data.auction);
                for (let i = 0; i < temp.length; i++) {
                    let tempArr = [];
                    for (let k = 0; k < fishOfAuc.length; k++) {
                        if (fishOfAuc[k].auctionId === temp[i]._id) {
                            tempArr.push(fishOfAuc[k].displayLabel);
                        }
                    }
                    let item = {
                        id: temp[i]._id,
                        auctionDate: temp[i].auctionDate ? moment(temp[i].auctionDate).format('LLL') : "Girilmedi",
                        creationDate: temp[i].createdAt ? moment(temp[i].createdAt).format('LLL') : "Girilmedi",
                        updateDate: temp[i].updatedAt ? moment(temp[i].updatedAt).format('LLL') : "Güncellenmedi",
                        buNeBilmiyom: temp[i].__v,
                        fishes: tempArr
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
    };

    useEffect(() => {
        handleGetUpcomingAuctions();
    }, [isAuctionDeleted]);

    function AddFishButton(props) {
        return (
            <Button size="medium" variant="contained" color="primary" onClick={props.click}>Balık Ekle</Button>
        );
    }

    function DisplayFishesofAuctionButton(props) {
        return (
            <Button size="medium" color="primary" onClick={props.click}>Balıkları Gör</Button>
        );
    }

    const handleClick = (id) => {
        setSelectedAuctionId(id);
        handleOpenModal();
    };

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

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('https://protected-refuge-39487.herokuapp.com/');
        setSocket(newSocket);


        return () => newSocket.close();
    }, [setSocket]);
    const initFishList = (id) => {
        socket.emit('initFish', { id: id });


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
                <AdminNavigation />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
                    {alert ?
                        (alertType ?
                            (<Alert onClose={() => { closeAlert() }} variant="filled" severity="success" sx={{ width: "20%" }}>{alertContent}</Alert>)
                            : (<Alert onClose={() => { closeAlert() }} variant="filled" severity="error">{alertContent}</Alert>))
                        : <></>}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
                    {deleteAlert ?
                        (deleteAlertType ?
                            (<Alert onClose={() => { closeDeleteAlert() }} variant="filled" severity="success" sx={{ width: "20%" }}>{deleteAlertContent}</Alert>)
                            : (<Alert onClose={() => { closeDeleteAlert() }} variant="filled" severity="error">{deleteAlertContent}</Alert>))
                        : <></>}
                </Box>
                <AddFishModal />
                <AddUrlModal id={auctionId} />
                <DisplayFishModal />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: "50px"
                }}>
                    <ThemeProvider theme={theme}>
                        <Paper sx={{ width: '80%', overflow: 'hidden' }}>
                            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: "center", my: 2 }} color="primary">
                                Gelecek Tarihli Mezatlar
                            </Typography>
                            <TableContainer sx={{ maxHeight: 700 }}>
                                <Table stickyHeader sx={{ minWidth: 1000 }} aria-label="prev auction table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>Mezat Tarihi</TableCell>
                                            <TableCell align='center'>Eklenme Tarihi</TableCell>
                                            <TableCell align='center'></TableCell>
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
                                                    <AddFishButton click={() => handleClick(row.id)} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <DisplayFishesofAuctionButton click={() => handleDisplay(row.id)} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button size="medium" color="primary" variant="outlined" onClick={() => handleOpenUrlModal(row.id)}>Mezatı Başlat</Button>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button size="medium" color="error" variant="outlined" onClick={() => handleDeleteAuctions(row.id)}>Mezatı Sil</Button>
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
export default UpcomingAuctionPage;