import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Navbar from '../components/navbar';
import Greeting from '../components/greeting';
import UnfulfilledRequests from '../components/unfulfilledRequests';
import MakeRequest from '../components/makeRequest';
import ServiceSelector from '../components/serviceSelector';
import CustomerSatisfaction from '../components/customerSatisfaction';
import AvailableRequests from '../components/availableRequests';

/**
 * Todo:
 * * implement context to keep track of number of clicks on service
 * * use context for "Most Popular Services" section
 */

const Dashboard = () => {
	const [cookie, setCookie] = useCookies(['user']);
	const { name, email, authToken, id, type } = cookie;
	const router = useRouter();

	useEffect(() => {
		if (!authToken) {
			router.push('/login');
		}
	}, [authToken]);

	return (
		<div>
			<Head>
				<title>{name && `${name}'s`} Dashboard</title>
			</Head>

			<Navbar to={`/profile/${id}`} title='Profile' />

			<main className='px-8 mt-3 lg:px-96 mx-auto scroll-smooth'>
				<Greeting name={name && name.split(' ')[0]} />
				{type === 'client' ? (
					<div>
						<ServiceSelector />
						<UnfulfilledRequests />
						<MakeRequest />
					</div>
				) : (
					<div>
						<CustomerSatisfaction />
						<AvailableRequests />
					</div>
				)}
			</main>
		</div>
	);
};

export default Dashboard;
