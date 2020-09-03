import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { sha256 } from 'js-sha256';
import useUserModel from 'models/userModel';
import useRouter from 'use-react-router';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(20),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    })
);

enum ErrCode {
    NO_ERR = -1,
    SERVER_ERROR = 100,
    INVALID_EMAIL = 101,
    INVALID_PASSWORD = 102,
};

export default () => {
    const classes = useStyles();
    const [email, setEmail] = React.useState('')
    const [pw, setPw] = React.useState('');
    const [emailError, setEmailError] = React.useState<null | string>(null);
    const [pwError, setPwError] = React.useState<null | string>(null);
    const { signIn, user, errCode, loading } = useUserModel();
    const { history } = useRouter();

    React.useEffect(() => {
        switch (errCode) {
            case ErrCode.SERVER_ERROR: {
                setEmailError('Server error');
                setPwError('Server error');
                break;
            }
            case ErrCode.INVALID_EMAIL: {
                setEmailError('Invalid email');
                break;
            }
            case ErrCode.INVALID_PASSWORD: {
                setPwError('Invalid password');
                break;
            }
            default: {
                if (user !== null) {
                    console.log('success')
                    setTimeout(() => history.push('/'), 100);
                }
            }
        }
    }, [errCode, user])

    const validateEmail = () => {
        const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return emailReg.test(email);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailError(null);
        setPwError(null);

        if (!validateEmail()) {
            setEmailError('Invalid email');
            return;
        }

        signIn(email, sha256(pw));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={emailError !== null}
                        helperText={emailError}
                    />
                    <TextField
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={pwError !== null}
                        helperText={pwError}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={loading}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {`Copyright © NCT Team ${new Date().getFullYear()}.`}
                </Typography>
            </Box>
        </Container>
    );
};
