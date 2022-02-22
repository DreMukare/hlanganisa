import Head from 'next/head';
import Link from 'next/link';
import Logo from '../components/logo';
import { useState } from 'react';
import axios from 'axios';

const Signup = ({ mode }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const userData = {
			name,
			email,
			type: mode,
			password,
		};

		const headers = {
			'Content-Type': 'application/JSON',
		};

		console.log(JSON.stringify(userData));

		axios
			.post(
				'http://192.168.100.109:5000/api/v1/users',
				JSON.stringify(userData),
				{ headers }
			)
			.then((res) => {
				console.log(res);
				console.log(res.data);
			})
			.catch((err) => console.log(err));
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

			<main className='flex flex-col align-center justify-center'>
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
							className='mt-2
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
					>
						Register
					</button>
				</form>
			</main>
		</>
	);
};

export default Signup;
