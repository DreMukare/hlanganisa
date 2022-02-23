import { useRouter } from 'next/router';
import { useCookie } from 'react-cookie';

const Dashboard = () => {
	const [cookie, setCookie] = useCookie(['user']);
	const router = useRouter();

	return { cookie } ? <p>Alll izz well</p> : <p>Not logged in</p>;
};
