import { useCookies } from 'react-cookie';

const BuildProfile = ({ mode }) => {
	const [cookies, setCookies] = useCookies(['user']);
	const { name, email, authToken, id } = cookies;
	return (
		<div>
			<p>{name}</p>
			<p>{email}</p>
			<p>{id}</p>
			<p>{authToken.toString()}</p>
		</div>
	);
};

export default BuildProfile;
