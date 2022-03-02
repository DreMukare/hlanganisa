import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import utf8 from 'utf8';
import { useCookies } from 'react-cookie';
import Navbar from '../../components/navbar';
import SectionHeading from '../../components/sectionHeading';
import Button from '../../components/button';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const Profile = ({ mode }) => {
	const [editMode, setEditMode] = useState(false);
	const [phone, setPhone] = useState();
	const [image, setImage] = useState(null);
	const [location, setLocation] = useState('');
	const [job, setJob] = useState('');
	const [bio, setBio] = useState('');
	const [workImages, setWorkImages] = useState([]);
	const [rate, setRate] = useState('');
	const [bioCount, setBioCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { id } = router.query;
	const [cookie, setCookie] = useCookies(['user']);
	const { authToken, type } = cookie;

	if (!authToken) {
		router.push('/login');
	}

	const convertToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result.replace('data:', '').replace(/^.+,/, ''));
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const onImageChange = async (e) => {
		if (e.target.files && e.target.files[0]) {
			const img = await convertToBase64(e.target.files[0]);
			setImage(img);
		}
	};

	const storeWorkImagesInState = async (e) => {
		if (e.target.files) {
			if (e.target.files.length > 4) {
				alert('You can only upload up to 4 photos');
			}
			for (const image of e.target.files) {
				const img = await convertToBase64(image);
				setWorkImages((prevState) => [img, ...prevState]);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		const encodedImages = [];

		if (image) {
			// encodedImage = await convertToBase64(image);
			console.log(image);
		}

		if (workImages) {
			for (const image of workImages) {
				encodedImages.push(image);
			}
			console.log(workImages);
		}

		const dataToSend =
			mode === 'service provider'
				? {
						phone_no: phone,
						location,
						profile_image: image,
						category: job,
						description: bio,
						work_images: encodedImages,
						rates: rate,
				  }
				: { phone_no: phone, location, profile_image: image };

		const dataToSendJSON = JSON.stringify(dataToSend);
		console.log(dataToSend);

		const headers = {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			'Access-Control-Expose-Headers': 'X-Token, Server, Vary',
			'X-Token': authToken,
		};

		axios
			.put(`http://192.168.100.109:5000/api/v1/users/${id}`, dataToSendJSON, {
				headers,
			})
			.then((res) => {
				if (res.status === 200) {
					console.log(res.data);
					setLoading(false);
					router.push('/dashboard');
				}
			})
			.catch((err) => {
				console.log(err);
				alert('Something went wrong, please try again');
				setLoading(false);
			});
	};

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
				<div className='flex justify-between items-center mb-12'>
					<Link href='/dashboard'>
						<a>
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
					<button
						className='bg-black text-white rounded-lg h-9 w-[10rem] hover:w-2/6 hover:h-9 transform-all ease-in-out duration-700 object-center'
						onClick={() => setEditMode(!editMode)}
					>
						Toggle Edit
					</button>
				</div>
				<section className='flex flex-col items-center gap-5 mt-5'>
					<div className='rounded-full'>
						{user?.profile_image ? (
							<Image
								src={`data:image/png;base64,${user?.profile_image}`}
								alt="User's profile picture"
								height={200}
								width={200}
								className='rounded-full'
							/>
						) : (
							<Image
								src='/default_profile_picture.jpg'
								alt='Default profile picture'
								height={200}
								width={200}
								className='rounded-full'
							/>
						)}
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
									{user?.work_images &&
										user?.work_images?.map((img, index) => (
											<Image
												key={index}
												src={`data:image/png;base64,${img}`}
												alt='Work picture'
												height={200}
												width={200}
											/>
										))}
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
							style='bg-black text-white rounded-lg h-11 w-[20rem] hover:w-4/6 hover:h-14 transform-all ease-in-out duration-700 object-center hover:text-xl mb-9'
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
							style='bg-black text-white rounded-lg h-11 w-[20rem] hover:w-4/6 hover:h-14 transform-all ease-in-out duration-700 object-center hover:text-xl'
						/>
					</div>
				</section>

				{editMode && (
					<form onSubmit={handleSubmit}>
						<section>
							<div className='mb-7'>
								<label htmlFor='phone'>Change your phone number</label>
								<PhoneInput
									defaultCountry='KE'
									placeholder='Enter phone number'
									onChange={setPhone}
									value={phone}
									id='picture'
									required
								/>
							</div>
							<div className='mb-7'>
								<label htmlFor='picture'>Change your profile picture</label>
								<input
									type='file'
									name='picture'
									id='picture'
									accept='image/png, image/gif, image/jpeg'
									onChange={onImageChange}
								/>
							</div>
							{type === 'service provider' && (
								<section>
									<div className='mb-7'>
										<label htmlFor='location'>
											Change your location (where you operate)
										</label>
										<input
											onChange={(e) => setLocation(e.target.value)}
											className='
                w-full
                px-4
                border-0 border-b-2 border-gray-400
                focus:ring-0 focus:border-black'
											type='text'
											name='name'
											id='name'
											placeholder='Enter your location'
											autoComplete='on'
											required
										/>
									</div>

									<div className='mb-7'>
										<label htmlFor='job'>Enter your job title</label>
										<input
											onChange={(e) => setJob(e.target.value)}
											className='w-full px-4 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-black'
											type='text'
											name='job'
											id='job'
											placeholder='e.g  plumber, electrician, etc'
											autoComplete='on'
											required
										/>
									</div>
									<div className='mb-7'>
										<label htmlFor='bio'>Tell clients more about you</label>
										<textarea
											className='
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  '
											id='bio'
											rows='3'
											onChange={(e) => {
												setBio(e.target.value);
												setBioCount(e.target.value.length);
											}}
											maxLength={250}
											placeholder='Describe yourself'
											required
										></textarea>
										<p className='text-sm font-secondary text-zinc-400'>
											{bioCount}/250
										</p>
									</div>
									<div className='mb-7'>
										<label htmlFor='workImages'>
											Share pictures of your work
										</label>
										<input
											type='file'
											name='picture'
											id='picture'
											accept='image/png, image/gif, image/jpeg'
											onChange={storeWorkImagesInState}
											multiple
										/>
									</div>
									<div className='mb-7'>
										<label htmlFor='rates'>Enter your hourly rate</label>
										<input
											className='
                    w-full
                    px-4
                    border-0 border-b-2 border-gray-400
                    focus:ring-0 focus:border-black'
											type='text'
											name='rates'
											id='rates'
											placeholder='eg 250 Ksh'
											onChange={(e) => setRate(e.target.value)}
											required
										/>
									</div>
								</section>
							)}
							<button
								type='submit'
								className='w-4/6 bg-black text-white rounded-lg h-12 hover:w-5/6 hover:h-14 transform-all ease-in-out duration-700 object-center hover:text-xl'
								disabled={loading}
							>
								Edit Profile Details
							</button>
						</section>
					</form>
				)}
			</main>
		</div>
	);
};

export default Profile;
