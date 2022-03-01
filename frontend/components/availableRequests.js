import Link from 'next/link';
import { useEffect, useState } from 'react';
import SectionHeading from './sectionHeading';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const AvailableRequests = () => {
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

	return (
		<div className='mb-12'>
			<SectionHeading text='Available Requests' />
			{/*[{ id : b3ert72c-a974-412c-8e4p-240uy973fchj, user_id: b3ert72c-a974-412c-8e4p-240uy973fchj, category: "pet services", content: "Need a dog groomer good with large dogs", status: "active" }]*/}

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
							<p className='text-lg max-w-prose mb-4'>{content}</p>
							<Link href={`request/${id}`}>
								<a className='underline'>View request page</a>
							</Link>
						</div>
					))}
			</div>
		</div>
	);
};

export default AvailableRequests;
