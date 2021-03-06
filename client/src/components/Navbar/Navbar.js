import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation} from 'react-router-dom';
import memories from '../../images/memories.png';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user,setuser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const dec = decode(token);
            if (dec.exp * 1000 < new Date().getTime()) logout();
        }
        setuser(JSON.parse(localStorage.getItem('profile')));
    },[location]);
    
    const logout = (() => {
        dispatch({type: 'LOGOUT' });
        history.push('/');
        setuser(null);
    });

    console.log('user');
    return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.res1.name} src={user?.res1.imageUrl}>{user?.res1.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.res1.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
          </AppBar>
    )
}

export default Navbar;