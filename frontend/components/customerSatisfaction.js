import React from 'react';
import { useCookies } from 'react-cookie';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SectionHeading from './sectionHeading';

const CustomerSatisfaction = () => {
	const [cookie, setCookie] = useCookies(['user']);

	return (
		<section className='mt-5 mb-9'>
			<SectionHeading text='Customer Satisfaction Level' />
			{cookie.rating > 0 ? (
				<div className='w-[200px] h-[200px] mx-auto'>
					<CircularProgressbar
						value={cookie.rating_count}
						text='Customer Satisfaction'
					/>
				</div>
			) : (
				<p className='text-lg'>You haven't been rated yet.</p>
			)}
		</section>
	);
};

export default CustomerSatisfaction;
