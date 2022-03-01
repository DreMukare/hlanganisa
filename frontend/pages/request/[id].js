import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import SectionHeading from '../../components/sectionHeading';
import Button from '../../components/button';

const Request = () => {
	const [category, setCategory] = useState();
	const [content, setContent] = useState();
	const [contentCount, setContentCount] = useState(0);
	const [request, setRequest] = useState();
	const [requestMakerId, setRequestMakerId] = useState('');
	const [requestMaker, setRequestMaker] = useState('');
	const router = useRouter();
	const { id } = router.query;
	const [cookie, setCookie] = useCookies(['user']);
	const { authToken, type } = cookie;

	useEffect(() => {
		if (!authToken) {
			router.push('/login');
		}
	});

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
			.then((res) => {
				setRequest(res.data);
				setRequestMakerId(res.data.user_id);
				console.log(res.data);
				console.log(request);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		axios
			.get(`http://192.168.100.109:5000/api/v1/users/${requestMakerId}`, {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
					'Access-Control-Expose-Headers': 'X-Token, Server, Vary',
					'X-Token': authToken,
				},
			})
			.then((res) => {
				setRequestMaker(res.data);
				console.log('running now');
			})
			.catch((err) => console.log(err));
	}, [requestMakerId]);

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.put(
				`http://192.168.100.109:5000/api/v1/requests/${request.user_id}`,
				JSON.stringify({ content: content, category: category }),
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
			.then((res) => console.log(res.data))
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
							className='w-7 h-7 mt-5 hover:w-9 hover:h-9 transform-all ease-in-out duration-700'
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
					<div>
						{requestMakerId && (
							<h1 className='text-3xl mb-5 mt-9'>
								Request by <span>{requestMaker.name}</span>
							</h1>
						)}
					</div>
				) : (
					<h1 className='text-4xl mt-9 mb-6'>{request?.category}</h1>
				)}

				<p className='text-xl max-w-prose mb-6'>{request?.content}</p>

				{type === 'service provider' && requestMakerId && (
					<section className='mx-auto mt-24 min-w-100 flex flex-col items-center'>
						<div className='w-full'>
							<p>Contact via phone</p>
							<Button
								text={requestMaker && requestMaker.phone_no}
								onClick={() => {
									requestMaker.phone_no &&
										navigator.clipboard.writeText(
											requestMaker && requestMaker.phone_no
										);
								}}
								style='bg-black text-white rounded-lg h-11 w-[20rem] hover:w-4/6 hover:h-14 transform-all ease-in-out duration-700 object-center hover:text-xl mb-9'
							/>
						</div>
						<div className='w-full'>
							<p>Contact via email</p>
							<Button
								text={requestMaker?.email}
								onClick={() => {
									navigator.clipboard.writeText(requestMaker?.email);
								}}
								style='bg-black text-white rounded-lg h-11 w-[20rem] hover:w-4/6 hover:h-14 transform-all ease-in-out duration-700 object-center hover:text-xl'
							/>
						</div>
					</section>
				)}

				{type === 'client' && (
					<section>
						<SectionHeading text='Edit this request' />
						<form onSubmit={handleSubmit}>
							<div className='mb-8'>
								<label htmlFor='category'>Category</label>
								<input
									onChange={(e) => setCategory(e.target.value)}
									className='mt-2
                w-full
                px-4
                border-0 border-b-2 border-gray-400
                focus:ring-0 focus:border-black'
									type='text'
									name='category'
									id='category'
									placeholder='Change the category of the request'
									autoComplete='on'
									required
								/>
							</div>
							<div className='mb-7'>
								<label htmlFor='content'>
									Change the description of the request
								</label>
								<textarea
									className='
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  '
									id='content'
									rows='3'
									onChange={(e) => {
										setContent(e.target.value);
										setContentCount(e.target.value.length);
									}}
									maxLength={250}
									placeholder='Change the description of the request'
									required
								></textarea>
								<p className='text-sm font-secondary text-zinc-400'>
									{contentCount}/250
								</p>
							</div>
							<button
								type='submit'
								className='w-4/6 bg-black text-white rounded-lg h-12 hover:w-5/6 hover:h-14 transform-all ease-in-out duration-700 object-center hover:text-xl'
							>
								Submit
							</button>
						</form>
					</section>
				)}
			</main>
		</>
	);
};

export default Request;
