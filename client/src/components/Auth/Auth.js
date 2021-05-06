import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import Icon from './Icon';
import {useHistory} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import {useDispatch} from 'react-redux';
import {signin, signup} from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword:''};
const Auth = () => {
    const classes = useStyles();
    const [showPassword, setshowPassword] = useState(false);
    const [isSignup , setIssignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formdata, setformdata] = useState(initialState);

    const switchMode = () => {
        setIssignup(x => !x);
        setshowPassword(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isSignup)
        {
            dispatch(signin(formdata, history));
        } else {
            dispatch(signup(formdata, history));
        }
    };

    const handleChange = (x) => {
        setformdata({...formdata, [x.target.name] : x.target.value})

    };

    const handleShowPassword = () => {
        setshowPassword(x => !x);
    }

    const googleSuccess = async (par) => {
        const result = par?.profileObj;
        const token = par?.tokenId;
    
        try {
          dispatch({ type: 'AUTH', data: { result, token } });
    
          history.push('/');
        } catch (error) {
          console.log(error);
        }
      };
    
      const googleFailure = (err) => {
          console.log(err);
        alert('Invalid. Try Again Later');
      }
          

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" lBel="Repeat Password" type="password" handleChange={handleChange} />}

                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign up' : 'Sign in'}
                    </Button>
                    <GoogleLogin clientId="941046263285-3shsniq22ql34sgqtik03d2fk6c4ng1u.apps.googleusercontent.com"
                    render={(pr) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={pr.onClick} disabled={pr.disabled} startIcon={<Icon />} variant="contained"> Google Sign In</Button>
                    )} 
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    ></GoogleLogin>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign in' : 'Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
