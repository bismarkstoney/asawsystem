import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';

import {
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	AUTH_ERROR,
	USER_LOADED,
} from '../type';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		error: null,
		user: null,
	};
	const [state, dispatch] = useReducer(authReducer, initialState);

	//load User
	const loadUser = async () => {
		//load token into global header
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/v1/auth');
			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (ere) {
			dispatch({ type: AUTH_ERROR });
		}
	};
	//register User
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/v1/users', formData, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});
			//load the user
			loadUser();
		} catch (err) {
			dispatch({
				type: REGISTER_FAIL,
				//msg is the error from the backend
				payload: err.response.data.msg,
			});
		}
	};
	//login User
	const login = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/v1/auth', formData, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
			//load the user
			loadUser();
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				//msg is the error from the backend
				payload: err.response.data.msg,
			});
		}
	};
	//logout
	const logout = () => dispatch({ type: LOGOUT });
	//Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				user: state.user,
				register,
				loadUser,
				login,
				logout,
				clearErrors,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
