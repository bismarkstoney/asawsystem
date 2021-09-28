import React, { useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
	const contactContect = useContext(ContactContext);
	const { deleteContact, setCurrent, clearCurrent } = contactContect;
	const onDelete = () => {
		deleteContact(_id);
		clearCurrent();
	};
	const { name, _id, email, phone, type } = contact;
	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{name}{' '}
				<span
					style={{ float: 'right' }}
					className={
						'badge ' +
						(type === 'professional' ? 'badge-success' : 'badge-primary')
					}>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>

			<ul className='list'>
				{email && (
					<li>
						{' '}
						<i className='fas fa-envelope-open'></i> {email}
					</li>
				)}
				{phone && (
					<li>
						{' '}
						<i className='fas fa-phone'></i> {phone}
					</li>
				)}
			</ul>
			<p>
				<button
					className='btn btn-dark btn-sm'
					onClick={() => setCurrent(contact)}>
					Edit Contact
				</button>
				<button className='btn btn-danger btn-sm' onClick={onDelete}>
					Delete Contact
				</button>
			</p>
		</div>
	);
};

export default ContactItem;
