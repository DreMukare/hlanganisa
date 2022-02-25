import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const LogoutBtn = () => {
	const [cookie, setCookie, removeCookie] = useCookies(['user']);
	const { authToken } = cookie;
	const router = useRouter();

	const handleClick = () => {
		axios
			.get('http://192.168.100.109:5000/api/v1/logout', {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
					'Access-Control-Expose-Headers': 'X-Token, Server, Vary',
					'X-Token': authToken,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					removeCookie('user');
					router.push('/login');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<button onClick={handleClick}>Logout</button>
		</div>
	);
};

export default LogoutBtn;
