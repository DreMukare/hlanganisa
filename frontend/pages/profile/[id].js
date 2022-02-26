import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import { useCookies } from 'react-cookie';
import Navbar from '../../components/navbar';
import SectionHeading from '../../components/sectionHeading';
import Button from '../../components/button';

const Profile = ({ mode }) => {
	const [edit, setEdit] = useState();
	const router = useRouter();
	const { id } = router.query;
	const [cookie, setCookie] = useCookies(['user']);
	const { authToken } = cookie;

	if (!authToken) {
		router.push('/login');
	}

	const { data: user, error } = useSWR(
		`http://192.168.100.109:5000/api/v1/users/${id}`,
		(url) =>
			axios
				.get(url, {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
						'Access-Control-Expose-Headers': 'X-Token, Server, Vary',
						'X-Token': authToken,
					},
				})
				.then((res) => res.data)
	);

	if (error) {
		console.log(error);
	}

	return (
		<div>
			<Head>
				<title>{user && `${user.name}'s`} Profile</title>
			</Head>

			<Navbar to='' href='' />

			<main className='mt-5 px-8 md:px-[12rem] lg:px-[36rem] mx-auto'>
				<Link href='/dashboard'>
					<a className='mb-12'>
						<svg
							className='w-7 h-7 hover:w-9 hover:h-9 transform-all ease-in-out duration-700'
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
				<section className='flex flex-col items-center gap-5 mt-5'>
					<div className='rounded-full'>
						<Image
							src='/default_profile_picture.jpg'
							alt='Profile picture'
							height={200}
							width={200}
							className='rounded-full'
						/>
					</div>
					<div>
						<h1 className='text-extrabold text-7xl'>
							{user?.name.split(' ')[0]}
						</h1>
						<h1 className='text-extrabold text-7xl'>
							{user?.name.split(' ')[1]}
						</h1>
					</div>
				</section>

				{user?.type === 'service provider' && (
					<section>
						<div className='flex justify-between min-w-full gap-4 mb-7'>
							<p className='text-bold text-2xl'>
								{user?.category.charAt(0).toUpperCase() +
									user?.category.slice(1)}
							</p>
							<p className='text-bold text-2xl'>Rating: {user?.rating}/5</p>
						</div>
						<p className='text-2xl'>
							<span className='font-extrabold'>{user?.rates}</span> per hour
						</p>
						<p className='text-2xl mb-12'>
							Located in{' '}
							<span className='font-extrabold'>{user?.location}</span>
						</p>
						<SectionHeading text='About Me' />
						<p className='mb-12'>{user && user?.description}</p>
						{user.work_images.length > 0 && (
							<section>
								<SectionHeading text='Pictures of my work' />
								<div className='flex flex-wrap gap-4'>
									{/* user.work_images &&
										user.work_images?.map((img) => (
											<Image
												src={img}
												alt='Work picture'
												height={200}
												width={200}
												className='rounded-full'
											/>
										)) */}
								</div>
							</section>
						)}
					</section>
				)}

				<section className='mx-auto mt-16 min-w-100 flex flex-col items-center'>
					<div className='w-full'>
						<p>
							Contact via phone (Click button to copy phone number to clipboard)
						</p>
						<Button
							tooltip='Click to copy to clipboard'
							text={user && user.phone_no}
							onClick={() => {
								user.phone_no &&
									navigator.clipboard.writeText(user && user.phone_no);
							}}
							style='bg-black text-white rounded-lg h-11 w-[24rem] hover:w-4/6 hover:h-14 transform-all ease-in-out duration-700 object-center hover:text-xl mb-9'
						/>
					</div>
					<div className='w-full mb-14'>
						<p>Contact via email (Click button to copy email to clipboard)</p>
						<Button
							tooltip='Click to copy to clipboard'
							text={user?.email}
							onClick={() => {
								navigator.clipboard.writeText(user?.email);
							}}
							style='bg-black text-white rounded-lg h-11 w-[24rem] hover:w-4/6 hover:h-14 transform-all ease-in-out duration-700 object-center hover:text-xl'
						/>
					</div>
				</section>
			</main>
		</div>
	);
};

export default Profile;
