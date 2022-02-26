import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../components/logo';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState('');
	const router = useRouter();
	const [cookie, setCookie] = useCookies(['user']);

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);

		const dataToPush = {
			email,
			password,
		};

		console.log(JSON.stringify(dataToPush));

		const headers = {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		};

		axios
			.post(
				'http://192.168.100.109:5000/api/v1/login',
				JSON.stringify(dataToPush),
				{
					headers,
				}
			)
			.then((res) => {
				if (res.status === 200) {
					console.log(res.data);
					console.log(res.headers);
					setLoading(false);
					setCookie('name', res.data.name, {
						sameSite: 'strict',
						path: '/',
						expires: new Date(new Date().getTime() + 86400 * 1000),
					});
					setCookie('type', res.data.type, {
						sameSite: 'strict',
						path: '/',
						expires: new Date(new Date().getTime() + 86400 * 1000),
					});
					setCookie('email', res.data.email, {
						sameSite: 'strict',
						path: '/',
						expires: new Date(new Date().getTime() + 86400 * 1000),
					});
					setCookie('id', res.data.id, {
						sameSite: 'strict',
						path: '/',
						expires: new Date(new Date().getTime() + 86400 * 1000),
					});
					setCookie('authToken', res.data.token, {
						sameSite: 'strict',
						path: '/',
						expires: new Date(new Date().getTime() + 86400 * 1000),
					});
					setCookie('rating', res.data.rating_count, {
						sameSite: 'strict',
						path: '/',
						expires: new Date(new Date().getTime() + 86400 * 1000),
					});
					router.push('/dashboard');
				}
			})
			.catch((err) => {
				console.log(err);
				alert('Something went wrong, please try again');
				setLoading(false);
			});
	};

	return (
		<>
			<Head>
				<title>Welcome back</title>
			</Head>

			<nav className='flex justify-between py-5 px-8'>
				<Logo />
				<div>
					<Link href='/'>
						<a className='hover:text-2xl transform-all ease-in-out duration-700'>
							Sign Up
						</a>
					</Link>
				</div>
			</nav>

			<main className='px-8 mx-auto scroll-smooth'>
				<h1 className='text-center font-secondary font-bold text-3xl'>
					Welcome back
				</h1>

				<form onSubmit={handleSubmit} className='w-4/6 md:w-1/6 mx-auto py-56'>
					<div className='mb-8'>
						<label htmlFor='email'>Email</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							className='mt-2
              w-full
              px-4
              border-0 border-b-2 border-gray-400
              focus:ring-0 focus:border-black'
							type='email'
							name='email'
							id='email'
							placeholder='Enter your email'
							autoComplete='email'
							required
						/>
					</div>
					<div className='mb-8'>
						<label htmlFor='password'>Password</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							className='mt-2
              w-full
              px-4
              border-0 border-b-2 border-gray-400
              focus:ring-0 focus:border-black'
							type='password'
							name='password'
							id='password'
							placeholder='Enter your password'
							required
						/>
					</div>
					<button
						type='submit'
						className='w-4/6 bg-black text-white rounded-lg h-12 hover:w-5/6 hover:h-14 transform-all ease-in-out duration-700 object-center hover:text-xl'
						disabled={loading}
					>
						Login
					</button>
				</form>
			</main>
		</>
	);
};

export default Login;
