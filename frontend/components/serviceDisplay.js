import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Loader from '../components/loader';

const useUsers = (category) => {
	const [cookie, setCookie] = useCookies(['user']);
	const { id, authToken } = cookie;
	const fetcher = (url) =>
		axios
			.get(url, {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
					'Access-Control-Expose-Headers': 'X-Token, Server, Vary',
					'X-Token': authToken,
				},
			})
			.then((res) => res.data);
	const { data, error } = useSWR(
		`http://192.168.100.109:5000/api/v1/users/${category}`,
		fetcher
	);

	return {
		users: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const ServiceDisplay = ({ selected }) => {
	const { users, isLoading, isError } = useUsers(selected);

	if (isError) {
		console.log(isError);
		return <p className='text-red-500'>Something went wrong</p>;
	}

	if (isLoading) {
		return <Loader color='black' height={80} width={80} />;
	}

	return (
		<div className='flex flex-wrap'>
			{users.map((user) => (
				<Link
					href={{ pathName: '/profile', query: { id: user.id } }}
					id={user.id}
				>
					<p>{user.name}</p>
					<p>{user.rates}</p>
					<p>{user.location}</p>
					<p>{user.rating}</p>
				</Link>
			))}
		</div>
	);
};

export default ServiceDisplay;
