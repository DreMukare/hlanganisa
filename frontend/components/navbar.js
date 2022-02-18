import Logo from './logo';
import LogoutBtn from './logoutbtn';
import Link from 'next/link';

// flex flex-row flex-nowrap items-center

const Navbar = ({ title, to }) => {
	return (
		<nav className='bg-gray-300'>
			<div className='mx-auto py-5 flex items-center justify-between'>
				<Logo />
				<div className='hidden md:flex items-center space-x-9 text-gray-500'>
					<Link href={to}>
						<a>{title}</a>
					</Link>
					<LogoutBtn />
				</div>
				<div className='md:hidden flex items-center'>
					<button
						onClick={() => {
							document.querySelector('.mobile-menu').classList.toggle('hidden');
						}}
					>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 6h16M4 12h16m-7 6h7'
							/>
						</svg>
					</button>
				</div>
			</div>
			<div className='mobile-menu hidden md:hidden flex flex-col items-end space-y-2 px-9 text-sm'>
				<Link href={to}>
					<a>{title}</a>
				</Link>
				<LogoutBtn />
			</div>
		</nav>
	);
};

export default Navbar;
