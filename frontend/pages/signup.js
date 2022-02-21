import Head from 'next/head';
import Link from 'next/link';
import Logo from '../components/logo';

const Signup = ({ mode }) => {
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
					<span className='hover:overline hover:tracking-widest transform-all ease-in-out duration-700'>
						{mode}
					</span>
				</h1>
			</main>
		</>
	);
};

export default Signup;
