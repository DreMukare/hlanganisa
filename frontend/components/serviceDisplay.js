import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const ServiceDisplay = ({ selected }) => {
	const [usersData, setUsersData] = useState();
	const [cookie, setCookie] = useCookies(['user']);
	const { id, authToken } = cookie;

	useEffect(() => {
		axios
			.post(
				'http://192.168.100.109:5000/api/v1/users/category',
				{
					category: selected,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
						'Access-Control-Expose-Headers': 'X-Token, Server, Vary',
						'X-Token': authToken,
					},
				}
			)
			.then((res) => {
				setUsersData(res.data);
			})
			.catch((err) => console.log(err));
	}, [selected]);

	return (
		<div className='flex flex-wrap gap-4 mt-8'>
			{usersData &&
				usersData.map((user) => (
					<Link href={`/profile/${user.id}`}>
						<a className='p-6 rounded-md shadow-lg bg-white max-w-sm w-64 hover:-translate-y-6 transform-all ease-in-out duration-700'>
							<Image
								src='/default_profile_picture.jpg'
								alt='Default profile picture'
								layout={'responsive'}
								width={32}
								height={20}
								objectFit={'contain'}
								quality={100}
							/>

							<h3 className='text-2xl mt-2 text-indigo-700'>{user.name}</h3>
							<p className='mt-2 text-sm text-gray-500'>
								Hourly Rate: {user.rates}
							</p>
							<p className='mt-2 text-sm text-gray-500'>
								Location: {user.location}
							</p>
							<p className='mt-2 text-sm text-gray-500'>
								Rating: {user.rating}
							</p>
						</a>
					</Link>
				))}
		</div>
	);
};

export default ServiceDisplay;
