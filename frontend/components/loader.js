import { Triangle } from 'react-loader-spinner';

const Loader = ({ height, width, color }) => {
	return (
		<Triangle height={height} width={width} color={color} ariaLabel='loading' />
	);
};

export default Loader;
