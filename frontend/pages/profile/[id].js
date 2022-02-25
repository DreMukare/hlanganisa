import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Navbar from '../../components/navbar';

const Profile = ({ mode }) => {
	const [user, setUser] = useState();
	const [edit, setEdit] = useState();
	const router = useRouter();
	const { id } = router.query;
	const [cookie, setCookie] = useCookies(['user']);
	const { authToken } = cookie;

	useEffect(() => {
		axios
			.get(`http://192.168.100.109:5000/api/v1/users/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
					'Access-Control-Expose-Headers': 'X-Token, Server, Vary',
					'X-Token': authToken,
				},
			})
			.then((res) => setUser(res.data))
			.catch((err) => console.log(err));
		console.log(user);
	}, [id]);

	return (
		<div>
			<Head>
				<title>{user && user.name}'s Profile</title>
			</Head>

			<Navbar to='' href='' />
		</div>
	);
};

export default Profile;
