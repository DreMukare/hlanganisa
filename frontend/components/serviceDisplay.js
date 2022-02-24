import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const useUsers = () => {
	const [cookie, setCookie] = useCookies(['user']);
	const { id, authToken } = cookie;
	const fetcher = (url) =>
		axios
			.get(url, {
				'X-Token': authToken,
			})
			.then((res) => res.data);
	const { data, error } = useSWR(
		'http://192.168.100.109:5000/api/v1/users',
		fetcher
	);

	return {
		users: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const serviceDisplay = ({ selected }) => {
	const { providers, setProviders } = useState([]);
	const { users, isLoading, isError } = useUsers();
	// filtering out user profiles based on selected
	const selectByCareer = (selected) => {
		if (!selected) {
			return <p className='hidden'>Make a selection</p>;
		}
		const serviceProviders = users.filter(
			(user) => user.type === 'service provider'
		);
		return serviceProviders.filter((user) => user.category === selected);
	};

	return (
		<div>
			{selectByCareer().map((user) => (
				<div id={user.id}>{user.name}</div>
			))}
		</div>
	);
};

export default serviceDisplay;
