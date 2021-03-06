import {
	ADD_CONTACT,
	UPDATE_CONTACT,
	DELETE_CONTACT,
	//SET_ALERT,
	SET_CURRENT,
	FILTER_CONTACT,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	CONTACT_ERROR,
	GET_CONTACTS,
	CLEAR_CONTACTS,
} from '../type';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
			};
		case ADD_CONTACT:
			return {
				...state,
				//add recent on top
				contacts: [action.payload, ...state.contacts],
				loading: false,
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact._id !== action.payload
				),
				loading: false,
			};

		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map((contact) =>
					contact._id === action.payload._id ? action.payload : contact
				),
				loading: false,
			};
		case SET_CURRENT:
			return { ...state, current: action.payload };
		case CLEAR_CURRENT:
			return { ...state, current: null };

		case FILTER_CONTACT:
			return {
				...state,
				filtered: state.contacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.name.match(regex) || contact.email.match(regex);
				}),
			};
		case CLEAR_FILTER:
			return { ...state, filtered: null };

		case CONTACT_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};

		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: null,
				filtered: null,
				error: null,
				current: null,
			};
		default:
			return state;
	}
};
