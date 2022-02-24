import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Select from 'react-select';
import Navbar from '../components/navbar';
import Greeting from '../components/greeting';

const services = [
	{ label: 'Plumber', value: 'Plumber' },
	{ label: 'Cleaner', value: 'Cleaner' },
	{ label: 'Cook', value: 'Cook' },
	{ label: 'Electrician', value: 'Electrician' },
	{ label: 'Dog Walker', value: 'Dog Walker' },
	{ label: 'Dog Groomer', value: 'Dog Groomer' },
	{ label: 'Salonist', value: 'Salonist' },
	{ label: 'Masseuse', value: 'Masseuse' },
	{ label: 'Music Teacher', value: 'Music Teacher' },
];

/**
 * Todo:
 * * implement context to keep track of number of clicks on service
 * * use context for "Most Popular Services" section
 */

const Dashboard = () => {
	const [selectedService, setSelectedService] = useState(null);
	const [cookie, setCookie] = useCookies(['user']);
	const { name, email, authToken, id } = cookie;
	const router = useRouter();

	useEffect(() => {
		if (!authToken) {
			router.push('/login');
		}
	}, [authToken]);

	return (
		<div>
			<Head>
				<title>{name}'s Dashboard</title>
			</Head>

			<Navbar title='Profile' to='/profile' />

			<main className='px-8 mt-3 mx-auto scroll-smooth'>
				<Greeting name={name} />

				<section className='my-5'>
					<h2 className='text-xl text-indigo-700 mb-2'>Services list</h2>
					<p className='mb-2'>Select the service you need</p>
					<Select
						className='mb-2'
						options={services}
						onChange={setSelectedService}
						defaultValue={selectedService}
					/>
				</section>
			</main>
		</div>
	);
};

export default Dashboard;
