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
import useUserModel from 'models/user/userModel'
import { sha256 } from 'js-sha256';
import useRouter from 'use-react-router'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(18),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

export default function SignUp() {
    const classes = useStyles()
    const [email, setEmail] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [ensure, setEnsure] = React.useState('')
    const [emailError, setEmailError] = React.useState<null | string>(null)
    const [pwError, setPwError] = React.useState<null | string>(null)
    const [ensureError, setEnsureError] = React.useState<null | string>(null)
    const { signIn, user, errCode, loading ,signUp} = useUserModel();
    const {history} = useRouter();

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
            case ErrCode.INVALID_ENSURE: {
                setPwError('Inconsistent password!');
                break;
            }
            case ErrCode.PASSWORD_TOO_SHORT: {
                setPwError('Password too short!')
                break
            }
            default: {
                if (user !== null) {
                    console.log('success')
                    setTimeout(() => history.push('/'), 100);
                }
            }
        }
    }, [errCode, user])

    enum ErrCode {
        NO_ERR = -1,
        SERVER_ERROR = 200,
        INVALID_EMAIL = 201,
        INVALID_ENSURE = 202,
        PASSWORD_TOO_SHORT = 203,
    }

    const validateEmail = () => {
        const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return emailReg.test(email);
    }

    const validatePassword = () => {
        return password.length >= 6
    }

    const validateEnsure = () => {
        return password === ensure
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEmailError(null)
        setPwError(null)
        setEnsureError(null)


        if(!validateEmail()){
            setEmailError("Invalid Email!")
            return
        }

        if(!validatePassword()){
            setPwError("Password too short!")
            return
        }

        if(!validateEnsure()){
            setEnsureError("Inconsistent password!")
            return
        }

        // 添加数据到后端
        signUp(username, email, password);

        //登录
        signIn(email, sha256(password));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={(e) => handleSubmit(e)} id='sign-up-form'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                autoComplete="username"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="username"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={emailError !== null}
                                helperText={emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                variant="outlined"
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={ensure}
                                onChange={(e)=>setEnsure(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                name="ensurePassword"
                                label="Ensure Password"
                                type="password"
                                id="ensurePassword"
                                autoComplete="current-password"
                                error={ensureError !== null}
                                helperText={ensureError}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        id='sign-up-button'
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
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
}