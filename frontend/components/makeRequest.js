import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import SectionHeading from './sectionHeading';

const MakeRequest = ({ toggleGetRequest }) => {
	const [category, setCategory] = useState();
	const [content, setContent] = useState();
	const [contentCount, setContentCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [cookie, setCookie] = useCookies(['user']);
	const { authToken, type } = cookie;

	const { id } = cookie;

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);
		axios
			.post(
				`http://192.168.100.109:5000/api/v1/requests`,
				JSON.stringify({
					user_id: id,
					content: content,
					category: category,
					status: 'active',
				}),
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
				console.log(res.data);
				setCategory('');
				setContent('');
				toggleGetRequest(true);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	return (
		<>
			<section className='mt-12 mb-9'>
				<SectionHeading text='Make a request' />
				<form onSubmit={handleSubmit}>
					<div className='mb-8'>
						<label htmlFor='category'>Category</label>
						<input
							onChange={(e) => {
								setCategory(e.target.value);
							}}
							className='mt-2
                w-full
                px-4
                border-0 border-b-2 border-gray-400
                focus:ring-0 focus:border-black'
							type='text'
							name='text'
							id='category'
							placeholder='Change the category of the request'
							autoComplete='on'
							required
							value={category}
						/>
					</div>
					<div className='mb-7'>
						<label htmlFor='content'>Description of the request</label>
						<textarea
							className='
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  '
							id='content'
							value={content}
							rows='3'
							onChange={(e) => {
								setContent(e.target.value);
								setContentCount(e.target.value.length);
							}}
							maxLength={250}
							placeholder='Description of the request'
							required
						></textarea>
						<p className='text-sm font-secondary text-zinc-400'>
							{contentCount}/250
						</p>
					</div>
					<button
						type='submit'
						className='w-4/6 bg-black text-white rounded-lg h-12 hover:w-5/6 hover:h-14 transform-all ease-in-out duration-700 object-center hover:text-xl'
						disabled={loading}
					>
						Make request
					</button>
				</form>
			</section>
		</>
	);
};

export default MakeRequest;
