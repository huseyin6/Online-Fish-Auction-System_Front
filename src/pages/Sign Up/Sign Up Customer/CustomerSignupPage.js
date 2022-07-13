import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha } from '@mui/material';
import axios from '../../../axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNavigation from '../../../components/Navigation/Login/LoginNavigation';

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


function CustomerSignupForm() {

    const navigate = useNavigate();
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

    // TODO
    const handleSignIn = async () => {
        navigate("/");
    };

    const handleCustomerSignUp = async (fisherman) => {
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
        console.log(password.length < 6);
        setIsEmptyPassword(password.length < 6);
        setLoading(true);
        try {
            const response = await axios.post('/customer/signup', {
                ...fisherman
            });
            if (response.status === 400) {
                console.log('failed');
                setAlertContent("Lütfen geçerli bilgiler girin");
                setAlertType(false);
                setAlert(true);
            } else if (response.status === 201) {
                console.log(response.data);
                setAlertContent("Hoşgeldiniz");
                setAlertType(true);
                setAlert(true);
                navigate("/");
            }
        }
        catch (e) {
            console.log(e);
            setAlertContent("Lütfen geçerli bilgiler girin");
            setAlertType(false);
            setAlert(true);
        }
        setLoading(false);
    };

    const closeAlert = async () => {
        setAlert(false);
    };

    return (
        <div>
            <LoginNavigation />
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
                <ThemeProvider theme={theme}>
                    <Card sx={{
                        width: 500,
                        maxWidth: '100%',
                        marginTop: '3%',
                        marginBottom: '4%',
                        backgroundColor: alpha(theme.palette.background.paper, 0.75)
                    }}
                    >
                        <CardHeader title="Üye Ol" sx={{ textAlign: 'center', m: 0.75 }} />
                        <CardContent>
                            <TextField
                                required
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
                                id="lastName"
                                error={isEmptyLastname}
                                helperText={isEmptyLastname ? 'Soy isim boş bırakılamaz' : ' '}
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
                                error={isEmptyUsername}
                                helperText={isEmptyUsername ? 'Kullanıcı adı boş bırakılamaz' : ' '}
                                label="Kullanıcı Adı"
                                color="primary"
                                onChange={(u) => setUsername(u.target.value)}
                            />
                        </CardContent>
                        <CardContent>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                error={!isEmailCorrect}
                                helperText={isEmailEmpty ? 'E-posta boş bırakılamaz' : !isEmailValid ? ' Lütfen "ornekEposta@ornek.com" formatında giriniz' : ' '}
                                label="E-posta adresi"
                                type="email"
                                color="primary"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </CardContent>
                        <CardContent>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                error={isEmptyPassword}
                                helperText={isEmptyPassword ? 'Parolanız en az 6 karakter olmalıdır.' : ' '}
                                label="Şifre"
                                type="password"
                                color="primary"
                                onChange={(p) => setPassword(p.target.value)} />
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="medium" variant="contained" color="primary" onClick={() => { handleCustomerSignUp(body); }}>Üye Ol</Button>
                            <Button size="medium" color="primary" onClick={() => { handleSignIn(); }}>Giriş Yap</Button>
                        </CardActions>
                    </Card>
                </ThemeProvider>
            </div>
        </div>
    );

}


function CustomerSignupPage() {
    return (
        <div style={{
            backgroundImage: `url(${fish})`,
            //backgroundPosition: 'center',
            backgroundSize: 'cover',
            //backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'

        }}>
            <CustomerSignupForm />
        </div>
    );
}

export default CustomerSignupPage;