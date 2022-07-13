import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
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


function AddFishPage()
{
    const [idArray, setIdArray] = useState([]);
    const [dateArray, setDateArray] = useState([]);
    //const [fishermanIdArray, setFishermanIdArray] = useState([]);
    //const [fishermanNameArray, setFishermanNameArray] = useState([]);

    const [allFishermanArray, setAllFishermanArray] = useState([]);
    const [selectedFisherman, setSelectedFisherman] = useState();
    const [allAuctionArray, setAllAuctionArray] = useState([]);
    const [selectedAuction, setSelectedAuction] = useState();

    const handleGetAllAuctions = async () => {
        try {
          const response = await axios.get('/auction/getUpcomingAuctions');
          if (response.status === 201) {
            //let idArr = [];
            //let dateArr = [];
            let allArr = [];
            let auc = response.data;
            let temp = auc.auction;
            for(let i=0; i<temp.length; i++){
              let item = {
                id: temp[i]._id,
                displayLabel: "Tarih - saat: " + moment(temp[i].auctionDate).format('LLL')
              }
              allArr.push(item);
            }
            setAllAuctionArray(allArr);
            //setIdArray(idArr);
            //setDateArray(dateArr);
          } else {
            console.log('failed');
          }
        }
        catch (e) {
          console.log(e);
        }
    };

    const handleGetAllFisherman = async () => {
        try {
          const response = await axios.get('/fisherman/getAllFisherman');
          if (response.status === 201) {
            let temp = response.data.fisherman;
            //console.log(temp);
            //let idArr = [];
            //let nameArr = [];
            let allArr = [];
            for(let i=0; i<temp.length; i++) {
              let item = {
                id: temp[i]._id,
                displayLabel: temp[i].firstName + " " + temp[i].lastName + " - Kullanıcı adı: " + temp[i].username
              }
              allArr.push(item);
            }
            //setFishermanIdArray(idArr);
            //setFishermanNameArray(nameArr);
            setAllFishermanArray(allArr);
            //console.log(response.data.fisherman);
          } else {
            console.log('failed');
          }
        }
        catch (e) {
          console.log(e);
        }
    };

    const [fmId, setFmId] = useState("");
    const [aucId, setAucId] = useState("");
    const [quan, setQuan] = useState("");
    const [inprice, setInprice] = useState("");
    const [type, setType] = useState("");

    const [aucDate, setAucDate] = useState("");
    const [fishermanName, setFishermanName] = useState("");

    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState();
    const [alertContent, setAlertContent] = useState("");
    const [loading, setLoading] = useState(false);

    


    const handleCreateFish = async (fish) => {
        setLoading(true);
        try {
          const response = await axios.post('/fish/createFish', {
            ...fish
          });
          if (response.status === 201) {
            console.log(response);
            //setFishId(response.data.fish._id);
            setAlertContent("Balık başarıyla eklendi");
            setAlertType(true);
            setAlert(true);
          } else {
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
    }

    const closeAlert = async () => {
        setAlert(false);
    };

    useEffect(() => {
        setLoading(true);
        handleGetAllAuctions();
        setLoading(false);
      }, []);

    useEffect(() => {
        setLoading(true);
        handleGetAllFisherman();
        setLoading(false);
      }, []);

    const addFishHandler = async () => {
      let body = {
          fishermanId: fmId,
          auctionId: aucId,
          quantity: quan,
          initialPrice: inprice,
          fishType: type
      };
      handleCreateFish(body);
      setSelectedAuction("");
      setSelectedFisherman("");
    }

    const handleAddFisherman = (event) => {
      console.log(event.target.value);
      setFmId(event.target.value);
    };

    const handleAddAuction = (event) => {
      console.log(event.target.value);
      setAucId(event.target.value);
    };

    return(
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
                <Box sx={{display: 'flex', justifyContent: 'center', m: 5}}>
                    {alert ? 
                    (alertType ? 
                    (<Alert onClose={() => {closeAlert()}} variant="filled" severity="success">{alertContent}</Alert>) 
                    : (<Alert onClose={() => {closeAlert()}} variant="filled" severity="error">{alertContent}</Alert>) ) 
                    : <></> }
                </Box>
                <div style={{ 
                    display:'flex', 
                    justifyContent:'center',
                }}>
                    <ThemeProvider theme={theme}>
                        <Card sx={{
                                width: 500,
                                maxWidth: '100%' 
                            }}
                        >
                            <CardHeader title="Balık Ekle" sx={{textAlign: 'center', m: 1}}/>
                            <CardContent>
                                <InputLabel id="fishermanID-label">Balıkçı</InputLabel>
                                <Select
                                  required
                                  fullWidth
                                  labelId="fishermanID-label"
                                  id="fishermanID"
                                  value={selectedFisherman}
                                  label="Balıkçı"
                                  onChange={handleAddFisherman}
                                >
                                  {allFishermanArray.map(({id, displayLabel}) => (
                                    <MenuItem key={id} value={id}>
                                      {displayLabel}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {/*<Autocomplete
                                    disablePortal
                                    fullWidth
                                    id="fishermanID"
                                    value={selectedFisherman}
                                    options={allFishermanArray}
                                    getOptionLabel={(option) => option.displayLabel}
                                    defaultValue={undefined}
                                    //onChange={(f) => setSelectedFisherman(f.target.value)}
                                    onChange={(event, value) => setSelectedFisherman(value)}
                                    renderInput={(params) => <TextField {...params} label="Balıkçı" />}
                                  />*/} 
                            </CardContent>
                            <CardContent>
                                <InputLabel id="auctionID-label">Mezat</InputLabel>
                                <Select
                                  fullWidth
                                  labelId="auctionID-label"
                                  id="auctionID"
                                  value={selectedAuction}
                                  label="Mezat"
                                  onChange={handleAddAuction}
                                >
                                  {allAuctionArray.map(({id, displayLabel}) => (
                                    <MenuItem key={id} value={id}>
                                      {displayLabel}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {/*<Autocomplete
                                    disablePortal
                                    fullWidth
                                    id="auctionID"
                                    value={selectedAuction}
                                    options={allAuctionArray}
                                    getOptionLabel={(option) => option.displayLabel}
                                    defaultValue={undefined}
                                    onChange={(event, value) => setSelectedAuction(value)}
                                    renderInput={(params) => <TextField {...params} label="Mezat" />}
                                  />*/}
                            </CardContent>
                            <CardContent>
                                <TextField 
                                    required 
                                    fullWidth 
                                    id="fishType" 
                                    label="Balık Türü" 
                                    color="primary" 
                                    onChange={(t) => setType(t.target.value)}
                                />
                            </CardContent>
                            <CardContent>
                                <TextField 
                                    required 
                                    fullWidth 
                                    id="weight" 
                                    label="Balık Miktarı"
                                    type='number'
                                    color="primary" 
                                    InputProps={{endAdornment: <InputAdornment position="end">kg</InputAdornment>}}
                                    onChange={(m) => setQuan(m.target.value)} 
                                />
                            </CardContent>
                            <CardContent>
                                <TextField 
                                    required 
                                    fullWidth 
                                    id="initialPrice" 
                                    label="Başlangıç Fiyatı"
                                    type='number'
                                    color="primary" 
                                    InputProps={{endAdornment: <InputAdornment position="end">TL</InputAdornment>}}
                                    onChange={(p) => setInprice(p.target.value)}
                                />
                            </CardContent>
                            <CardActions sx={{justifyContent: 'center'}}>
                                <Button size="large" variant="contained" color="primary"onClick={() => { addFishHandler(); }}>Ekle</Button>
                            </CardActions>
                        </Card>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}

export default AddFishPage;