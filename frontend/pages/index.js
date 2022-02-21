import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/button';
import Logo from '../components/logo';
import { useRouter } from 'next/router';

export default function Home({ setAppMode, mode }) {
	const router = useRouter();

	const handleClickService = (e) => {
		e.preventDefault();
		setAppMode('service provider');
		router.push('/signup');
	};

	const handleClickClient = (e) => {
		e.preventDefault();
		setAppMode('client', () => {});
		router.push('/signup');
	};

	return (
		<div>
			<Head>
				<title>Hlanganisa Landing Page</title>
				<meta name='description' content='Hlanganisa landing page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<nav className='flex justify-between py-5 px-8'>
				<Logo />
				<div>
					<Link href='/login'>
						<a className='hover:text-2xl transform-all ease-in-out duration-700'>
							Login
						</a>
					</Link>
				</div>
			</nav>
			<main className='h-100'>
				<section className='px-11 mt-80 mx-auto'>
					<h1 className='font-bold text-4xl text-left'>CONNECT AND SHARE</h1>
					<p className='w-3/4'>
						Hlanganisa is a community for professionals to interact with clients
						and showcase their services.
					</p>
					<div className='flex flex-col gap-4 mt-8 w-max mx-auto'>
						<Button
							onClick={handleClickService}
							text='Join as a service provider'
							style='border text-white bg-black text-lg hover:mt-3 hover:text-3xl hover:mb-6 hover:w-[36rem] hover:h-24 transform-all ease-in-out duration-700'
						/>
						<Button
							onClick={handleClickClient}
							text='Join as a client'
							style='border text-white bg-black text-lg hover:mt-6 hover:text-3xl hover:w-[36rem] hover:h-24 transform-all ease-in-out duration-700'
						/>
					</div>
				</section>
			</main>

			<footer></footer>
		</div>
	);
}
