import Link from 'next/link';
import { useEffect, useState } from 'react';
import SectionHeading from './sectionHeading';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const UnfulfilledRequests = ({ makeGetRequest, toggleGetRequest }) => {
	const [requests, setRequests] = useState();
	const [cookie, setCookie] = useCookies(['user']);
	const { authToken, id } = cookie;

	useEffect(() => {
		axios
			.get('http://192.168.100.109:5000/api/v1/requests', {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
					'Access-Control-Expose-Headers': 'X-Token, Server, Vary',
					'X-Token': authToken,
				},
			})
			.then((res) => {
				toggleGetRequest(false);
				setRequests(res.data);
			})
			.catch((err) => console.log(err));
	}, [makeGetRequest]);

	const handleClick = (id) => {
		axios
			.put(
				`http://192.168.100.109:5000/api/v1/requests/${id}`,
				{ status: 'fulfilled' },
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
				toggleGetRequest(true);
				setRequests(res.data);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='mt-12'>
			<SectionHeading text='Unfulfilled Requests' />

			<div>
				{requests?.length > 0 &&
					requests?.map(({ id, category, content }) => (
						<div
							key={id}
							className='p-6 rounded-md shadow-lg mb-3 bg-white w-[22rem] max-w-sm w-[24rem] hover:-translate-y-3 transform-all ease-in-out duration-700'
						>
							<h3 className='text-extrabold text-xl'>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</h3>
							<p className='text-lg max-w-prose mt-3'>{content}</p>
							<div className='flex gap-3 justify-between mt-2'>
								<button className='underline' onClick={() => handleClick(id)}>
									Click to mark as fulfilled
								</button>
								<Link href={`request/${id}`}>
									<a className='underline'>Edit request</a>
								</Link>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default UnfulfilledRequests;
