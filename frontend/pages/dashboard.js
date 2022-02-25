import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Select from 'react-select';
import Navbar from '../components/navbar';
import Greeting from '../components/greeting';
import ServiceDisplay from '../components/serviceDisplay';

const services = [
	{ label: 'Plumber', value: 'plumber' },
	{ label: 'Cleaner', value: 'cleaner' },
	{ label: 'Cook', value: 'cook' },
	{ label: 'Electrician', value: 'electrician' },
	{ label: 'Dog Walker', value: 'dog walker' },
	{ label: 'Dog Groomer', value: 'dog groomer' },
	{ label: 'Salonist', value: 'salonist' },
	{ label: 'Masseuse', value: 'masseuse' },
	{ label: 'Music Teacher', value: 'music teacher' },
];

/**
 * Todo:
 * * implement context to keep track of number of clicks on service
 * * use context for "Most Popular Services" section
 */

const Dashboard = () => {
	const [selectedService, setSelectedService] = useState();
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

			<Navbar to={`/profile/${id}`} title='Profile' />

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
						isClearable={true}
					/>
					{selectedService ? (
						<ServiceDisplay selected={selectedService.value} />
					) : (
						<p className='hidden'>Select a service</p>
					)}
				</section>
			</main>
		</div>
	);
};

export default Dashboard;
