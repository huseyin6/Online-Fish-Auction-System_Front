import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import AdminNavigation from '../../../components/Navigation/Admin/AdminNavigation';
import axios from '../../../axios';
import fish from "../../../fish.jpg";

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

function FishermanRegisterationPage() {
    const [isEmptyUsername, setIsEmptyUsername] = useState(false);
    const [isEmptyPassword, setIsEmptyPassword] = useState(false);
    const [isEmptyFirstname, setIsEmptyFirstname] = useState(false);
    const [isEmptyLastname, setIsEmptyLastname] = useState(false);
    const [isEmailCorrect, setIsEMailCorrect] = useState(true);
    const [isEmailValid, setIsEMailValid] = useState(true);
    const [isEmailEmpty, setIsEMailEmpty] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState();
    const [alertContent, setAlertContent] = useState("");
    const [loading, setLoading] = useState(false);

    const body = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
    };

    const handleFishermanSignUp = async (fisherman) => {
        if (!email) {
            //email bossa giriyor
            setIsEMailEmpty(!email);
            setIsEMailCorrect(false);
        } else {
            //email bos degilse 
            setIsEMailEmpty(false);
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(email)) {
                setIsEMailValid(true);
                setIsEMailCorrect(true);
            } else {
                setIsEMailValid(false);
                setIsEMailCorrect(false);

            }
        }
        setIsEmptyFirstname(!firstName);
        setIsEmptyLastname(!lastName);
        setIsEmptyUsername(!username);
        setIsEmptyPassword(password.length < 6);
        setLoading(true);
        try {
            const response = await axios.post('/fisherman/signup', {
                ...fisherman
            });
            if (response.status === 400) {
                console.log('failed');
                setAlertContent("Lütfen geçerli bilgiler girin");
                setAlertType(false);
                setAlert(true);
            } else if (response.status === 201) {
                //setFishermanId(response.data.user._id);
                setAlertContent("Balıkçı başarıyla eklendi");
                setAlertType(true);
                setAlert(true);
            }
        }
        catch (e) {
            console.log(e);
            setAlertContent("Lütfen geçerli bilgiler girin");
            setAlertType(false);
            setAlert(true);
        }
        setLoading(false);
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
            <div style={{
                maxWidth: '100vw',
                maxHeight: '100vh'
            }}>
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
                            (<Alert onClose={() => { closeAlert() }} variant="filled" severity="success" sx={{ width: "18%" }}>{alertContent}</Alert>)
                            : (<Alert onClose={() => { closeAlert() }} variant="filled" severity="error" sx={{ width: "18%" }}>{alertContent}</Alert>))
                        : <></>}
                </Box>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <ThemeProvider theme={theme}>
                        <Card sx={{
                            width: 500,
                            maxWidth: '100%'
                        }}
                        >
                            <CardHeader title="Balıkçı Ekle" sx={{ textAlign: 'center', m: 1 }} />
                            <CardContent>
                                <TextField
                                    fullWidth
                                    error={isEmptyFirstname}
                                    helperText={isEmptyFirstname ? 'İsim boş bırakılamaz' : ' '}
                                    id="firstName"
                                    label="İsim"
                                    color="primary"
                                    onChange={(f) => setFirstName(f.target.value)}
                                />
                            </CardContent>
                            <CardContent>
                                <TextField
                                    required
                                    fullWidth
                                    error={isEmptyLastname}
                                    helperText={isEmptyLastname ? 'Soy isim boş bırakılamaz' : ' '}
                                    id="lastName"
                                    label="Soyisim"
                                    color="primary"
                                    onChange={(l) => setLastName(l.target.value)}
                                />
                            </CardContent>
                            <CardContent>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Kullanıcı Adı"
                                    error={isEmptyUsername}
                                    helperText={isEmptyUsername ? 'Kullanıcı adı boş bırakılamaz' : ' '}
                                    color="primary"
                                    onChange={(u) => setUsername(u.target.value)}
                                />
                            </CardContent>
                            <CardContent>
                                <TextField
                                    required
                                    fullWidth
                                    error={!isEmailCorrect}
                                    helperText={isEmailEmpty ? 'E-posta boş bırakılamaz' : !isEmailValid ? ' Lütfen "ornekEposta@ornek.com" formatında giriniz' : ' '}
                                    type="email"
                                    id="email"
                                    label="E-posta adresi"
                                    color="primary"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </CardContent>
                            <CardContent>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="password"
                                    error={isEmptyPassword}
                                    helperText={isEmptyPassword ? 'Parolaniz en az 6 karakter olmalıdır.' : ' '}
                                    label="Şifre"
                                    color="primary"
                                    onChange={(p) => setPassword(p.target.value)}
                                />
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Button size="large" variant="contained" color="primary" onClick={() => {
                                    handleFishermanSignUp(body);
                                }}>Kaydet</Button>
                            </CardActions>
                        </Card>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}

export default FishermanRegisterationPage;