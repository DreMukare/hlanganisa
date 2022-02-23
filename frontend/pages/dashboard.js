import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const Dashboard = () => {
	const [cookie, setCookie] = useCookies(['user']);
	const { name, email, authToken, id } = cookie;
	const router = useRouter();

	if (!cookie.authToken) {
		router.push('/login');
	}

	return (
		<div>
			<Head>
				<title>{name}'s Dashboard</title>
			</Head>

			<p onClick={() => console.log(cookie)}>welcome {name}</p>
		</div>
	);
};

export default Dashboard;
