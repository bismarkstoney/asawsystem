import React, { useReducer } from 'react';

//import uuid from 'uuid';
//import { v4 as uuid } from 'uuid';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
	ADD_CONTACT,
	UPDATE_CONTACT,
	DELETE_CONTACT,
	CONTACT_ERROR,
	SET_CURRENT,
	FILTER_CONTACT,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	GET_CONTACTS,
	CLEAR_CONTACTS,
} from '../type';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
	};
	const [state, dispatch] = useReducer(contactReducer, initialState);

	//GER contacts

	const getContact = async () => {
		//Token is set global

		try {
			const res = await axios.get('/api/v1/contacts');
			dispatch({ type: GET_CONTACTS, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};
	//Add Contact
	const addContact = async (contact) => {
		//Token is set global
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/v1/contacts', contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	//DELETE CONTACT
	const deleteContact = async (id) => {
		try {
			await axios.delete(`/api/v1/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	//UPDATE CONTACT
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.put(
				`/api/v1/contacts/${contact._id}`,
				contact,
				config
			);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	//clear Contacts on logout
	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};
	//SET CURRENT
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};
	// CLEAR CURRENT
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//FILTER CONTACTS

	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACT, payload: text });
	};
	//CLEAR FILTER
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
				getContact,
				clearContacts,
			}}>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
