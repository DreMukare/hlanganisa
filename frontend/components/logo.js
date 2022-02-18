import Link from 'next/link';

const Logo = () => {
	return (
		<div>
			<Link href='/'>
				<a className='font-secondary font-bold text-xl tracking-wide hover:tracking-widest transform-all ease-in-out duration-700'>
					HLANGANISA
				</a>
			</Link>
		</div>
	);
};

export default Logo;
