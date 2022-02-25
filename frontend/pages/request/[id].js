import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import SectionHeading from '../../components/sectionHeading';

const Request = () => {
	const [edit, setEdit] = useState();
	const [category, setCategory] = useState();
	const [content, setContent] = useState();
	const [request, setRequest] = useState();
	const [requestMakerName, setRequestMakerName] = useState('');
	const router = useRouter();
	const { id } = router.query;
	const [cookie, setCookie] = useCookies(['user']);
	const { authToken, type } = cookie;

	if (!authToken) {
		router.push('/login');
	}

	useEffect(() => {
		axios
			.get(`http://192.168.100.109:5000/api/v1/requests/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
					'Access-Control-Expose-Headers': 'X-Token, Server, Vary',
					'X-Token': authToken,
				},
			})
			.then((res) => setRequest(res.data))
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		axios
			.get(`http://192.168.100.109:5000/api/v1/users/${request.user_id}`, {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
					'Access-Control-Expose-Headers': 'X-Token, Server, Vary',
					'X-Token': authToken,
				},
			})
			.then((res) => setRequestMakerName(res.data.name))
			.catch((err) => console.log(err));
	});

	const handleSubmit = () => {
		axios
			.put(
				`http://192.168.100.109:5000/api/v1/requests/${request.user_id}`,
				{ content: content, category: category },
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
			.then((res) => setRequestMakerName(res.data.name))
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Head>
				<title>Request Page</title>
			</Head>

			<main className='px-8 mx-auto'>
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

				{type === 'service provider' ? (
					<h1>
						Request by <span>{requestMakerName}</span>
					</h1>
				) : (
					<h1>{request.category}</h1>
				)}

				<p>{request.content}</p>

				{type === 'client' && (
					<section>
						<SectionHeading text='Edit this request'>
							<form onSubmit={handleSubmit}></form>
						</SectionHeading>
					</section>
				)}
			</main>
		</>
	);
};

export default Request;
