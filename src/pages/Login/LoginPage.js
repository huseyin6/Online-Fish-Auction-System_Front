import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha } from '@mui/material';
import axios from '../../axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNavigation from '../../components/Navigation/Login/LoginNavigation';

import fish from "../../fish.jpg";



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


/*
const adminUserBody = {
    username: "admin",
    password: "1234567"
}
*/



function LoginForm() {
    const navigate = useNavigate();
    const [isEmptyUsername, setIsEmptyUsername] = useState(false);
    const [isEmptyPassword, setIsEmptyPassword] = useState(false);

    const [un, setUsername] = useState("");
    const [pw, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState();
    const [alertContent, setAlertContent] = useState("");

    let body = {
        username: String(un),
        password: String(pw)
    }

    const handleRoleNavigate = async (role) => {
        console.log(role);
        // eslint-disable-next-line default-case
        switch (role) {
            case "admin":
                navigate("/admin");
                break;
            case "fisherman":
                navigate("/fisherman");
                break;
            case "customer":
                navigate("/customer");
                break;
        }
    }

    const handleSignIn = async (adminUser) => {
        setIsEmptyUsername(!un);
        setIsEmptyPassword(!pw);
        setLoading(true);
        try {
            const response = await axios.post('/auth/signin', {
                ...adminUser
            });
            if (response.status === 200) {
                //console.log(response.data);
                const { token, user } = response.data;
                const role = user.role;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setAlertContent("Başarıyla giriş yapıldı");
                setAlertType(true);
                setAlert(true);
                handleRoleNavigate(role);
            } else {
                console.log('failed');
                setAlertContent("Giriş yapılamadı");
                setAlertType(false);
                setAlert(true);
            }
        }
        catch (e) {
            console.log(e);
            setAlertContent("Giriş yapılamadı");
            setAlertType(false);
            setAlert(true);
        }
        setLoading(false);
    }

    const handleSignUp = async () => {
        navigate("/sign-up");
    };

    const closeAlert = async () => {
        setAlert(false);
    };

    return (
        <div>
            <LoginNavigation />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
                {alert ?
                    (alertType ?
                        (<Alert onClose={() => { closeAlert() }} variant="filled" severity="success" sx={{ width: "18%" }}>{alertContent}</Alert>)
                        : (<Alert onClose={() => { closeAlert() }} variant="filled" severity="error" sx={{ width: "18%" }}>{alertContent}</Alert>))
                    : <></>}
            </Box>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <ThemeProvider theme={theme}>
                    <Card sx={{
                        width: 500,
                        maxWidth: '100%',
                        marginTop: '5%',
                        backgroundColor: alpha(theme.palette.background.paper, 0.75)
                    }}
                    >
                        <CardHeader title="Giriş Yap" sx={{ textAlign: 'center', m: 0.75 }} />
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
                                id="password"
                                error={isEmptyPassword}
                                helperText={isEmptyPassword ? 'Şifre boş bırakılamaz' : ' '}
                                label="Şifre"
                                type="password"
                                color="primary"
                                onChange={(p) => setPassword(p.target.value)}
                            />
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="medium" variant="contained" color="primary" onClick={() => { handleSignIn(body); }}>Giriş Yap</Button>
                            <Button size="medium" color="primary" onClick={() => { handleSignUp(); }}>Üye Ol</Button>
                        </CardActions>
                    </Card>
                </ThemeProvider>
            </div>
        </div>
    );
}


function LoginPage() {
    return (
        <div style={{
            backgroundImage: `url(${fish})`,
            //backgroundPosition: 'center',
            backgroundSize: 'cover',
            //backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'

        }}>
            <LoginForm />
        </div>
    );
}

export default LoginPage;