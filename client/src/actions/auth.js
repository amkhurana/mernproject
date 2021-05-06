import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formdata, history) => async (dispatch) => {
 try {
     const {data} = await api.signin(formdata);
     dispatch({ type: AUTH, data});
     history.push('/');
 }catch(err) {
     console.log(err);
 }
 
};

export const signup = (formdata, history) => async(dispatch) => {
    try {
        console.log(formdata);
        const {data} = await api.signup(formdata);
        dispatch({ type: AUTH, data});
        history.push('/');
    }catch(err) {
        console.log(err);
    }
    
   };
