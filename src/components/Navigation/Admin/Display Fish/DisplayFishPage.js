import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
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



function DisplayFishPage() {
    const [loading, setLoading] = useState(false);
    const [allFishArray, setAllFishArray] = useState([]);


    /*
    const [fmId, setFmId] = useState("");
    const [fmName, setFmName] = useState("");
    
    
    const handleGetFishermanById = (id) => {
        let name = "-"
        try {
          const response = axios.get('/fisherman/getFishermanById/' + id);
          if (response.status === 201) {
              let temp = response.data;
              name = temp.firstName + " " + temp.lastName;
          } else {
            console.log('failed');
          }
        }
        catch (e) {
          console.log(e);
        }
        return name;
    }
    */


    const handleGetAllFish = async () => {
        setLoading(true);
        try {
            const response = await axios.get('fish/getAllFish');
            if (response.status === 201) {
                let temp = response.data;
                let arr = [];
                console.log(temp);
                for (let i = 0; i < temp.length; i++) {
                    let item = {
                        id: temp[i]._id,
                        fishermanId: temp[i].fishermanId ? temp[i].fishermanId._id : "-",
                        fishermanName: temp[i].fishermanId ? (temp[i].fishermanId.firstName + " " + temp[i].fishermanId.lastName + " - Kullanıcı Adı: " + temp[i].fishermanId.username) : "-",
                        auctionId: temp[i].auctionId ? temp[i].auctionId._id : "-",
                        auctionDate: temp[i].auctionId ? moment(temp[i].auctionId.auctionDate).format('LLL') : "-",
                        quantity: temp[i].quantity,
                        initialPrice: temp[i].initialPrice,
                        fishType: temp[i].fishType,
                        creationDate: temp[i].createdAt ? moment(temp[i].createdAt).format('LLL') : "Girilmedi",
                        updateDate: temp[i].updatedAt ? moment(temp[i].updatedAt).format('LLL') : "Güncellenmedi",
                        buNeBilmiyom: temp[i].__v // TODO
                    };
                    arr.push(item);
                }
                setAllFishArray(arr);
                console.log(arr);
                console.log(allFishArray);
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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: "50px"
                    }}>
                        <ThemeProvider theme={theme}>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: "center", my: 3 }} color="primary">
                                    Tüm Balıklar
                                </Typography>
                                <TableContainer sx={{ maxHeight: 700 }}>
                                    <Table stickyHeader sx={{ minWidth: 1500 }} aria-label="all fish table">
                                        <TableHead sx={{ backgroundColor: "grey", fontSize: 22 }}>
                                            <TableRow>
                                                <TableCell align="center">Balık Türü</TableCell>
                                                <TableCell align="center">Balık Miktarı&nbsp;(kg)</TableCell>
                                                <TableCell align="center">Başlangıç Fiyatı&nbsp;(tl)</TableCell>
                                                <TableCell align="center">Eklenme Tarihi</TableCell>
                                                <TableCell align="center">Balıkçı</TableCell>
                                                <TableCell align="center">Mezat Tarihi</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {allFishArray.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">
                                                        {row.fishType}
                                                    </TableCell>
                                                    <TableCell align="center">{row.quantity}</TableCell>
                                                    <TableCell align="center">{row.initialPrice}</TableCell>
                                                    <TableCell align="center">{row.creationDate}</TableCell>
                                                    <TableCell align="center">{row.fishermanName}</TableCell>
                                                    <TableCell align="center">{row.auctionDate}</TableCell>
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

export default DisplayFishPage;