import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../components/logo';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Signup = ({ mode, setWorkAround }) => {
	const router = useRouter();
	const [cookie, setCookie] = useCookies(['user']);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);

		const userData = {
			name,
			email,
			type: mode,
			password,
		};

		const headers = {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			'Access-Control-Expose-Headers': 'X-Token, Server, Vary',
		};

		console.log(JSON.stringify(userData));

		axios
			.post(
				'http://192.168.100.109:5000/api/v1/users',
				JSON.stringify(userData),
				{ headers }
			)
			.then((res) => {
				if (res.status === 201) {
					console.log(res.data);
					console.log(res.headers);
					setLoading(false);
					setWorkAround(password);
					setCookie('name', name, {
						sameSite: 'strict',
						path: '/',
						expires: new Date(new Date().getTime() + 86400 * 1000),
					});
					setCookie('email', email, {
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
					router.push('/buildprofile');
				}
			})
			.catch((err) => {
				console.log(err);
				alert('Something went wrong. Please try again');
				setLoading(false);
			});
	};

	return (
		<>
			<Head>
				<title>Sign up as a {mode}</title>
			</Head>

			<nav className='flex justify-between py-5 px-8'>
				<Logo />
				<div>
					<Link href='/'>
						<a>
							<svg
								className='w-6 h-6 hover:w-9 hover:h-9 transform-all ease-in-out duration-700'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M15 19l-7-7 7-7'
								/>
							</svg>
						</a>
					</Link>
				</div>
			</nav>

			<main className='px-8 mx-auto scroll-smooth'>
				<h1 className='text-center font-secondary font-bold text-3xl'>
					Sign up as a{' '}
					<span className='hover:overline hover:tracking-wider transform-all ease-in-out duration-700'>
						{mode}
					</span>
				</h1>

				<form onSubmit={handleSubmit} className='w-4/6 md:w-2/6 mx-auto my-56'>
					<div className='mb-8'>
						<label htmlFor='name'>Full Name</label>
						<input
							onChange={(e) => setName(e.target.value)}
							className='
              w-full
              px-4
              border-0 border-b-2 border-gray-400
              focus:ring-0 focus:border-black'
							type='text'
							name='name'
							id='name'
							placeholder='Enter your name'
							autoComplete='on'
							required
						/>
					</div>
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
						Register
					</button>
				</form>
			</main>
		</>
	);
};

export default Signup;
