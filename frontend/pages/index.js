import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Logo from '../components/logo';
import Navbar from '../components/navbar';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Hlanganisa landing page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navbar to='/dashboard' title='Dashboard' />
			{/* <nav>
				<Logo />
			</nav> */}
			<main className={styles.main}></main>

			<footer className={styles.footer}></footer>
		</div>
	);
}
