import React from 'react';
import logo from './logo.jpeg';
const About = () => {
	return (
		<div>
			<h1>About</h1>
			<p className='my-1'>This is an app for keeping contacts of Asaw System</p>
			<p className='bg-dark p'>
				<strong>Version</strong>: 1.1
			</p>
			<span>
				<img src={logo} alt='' />
			</span>
		</div>
	);
};

export default About;
