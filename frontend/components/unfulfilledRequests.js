import Link from 'next/link';
import { useEffect, useState } from 'react';
import SectionHeading from './sectionHeading';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const UnfulfilledRequests = () => {
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
				setRequests(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

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
				setRequests(res.data);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='mt-12'>
			<SectionHeading text='Unfulfilled Requests' />
			{/*[{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, category: "pet services", content: "Need a dog groomer good with large dogs", status: "active" }]*/}
			{requests ? (
				<p>You haven't made any requests yet.</p>
			) : (
				<div>
					{requests?.map(({ id, category, content }) => (
						<div>
							<h3 className='text-extrabold text-xl'>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</h3>
							<p className='text-lg max-w-prose'>{content}</p>
							<button onClick={() => handleClick(id)}>
								Click to mark as fulfilled
							</button>
							<Link href={`request/${id}`}>
								<a>Edit request</a>
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default UnfulfilledRequests;
