import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import Logo from '../components/logo';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const BuildProfile = ({ mode }) => {
	const [cookies, setCookies] = useCookies(['user']);
	const router = useRouter();
	const { name, email, authToken, id } = cookies;
	const [phone, setPhone] = useState();
	const [image, setImage] = useState(null);
	const [location, setLocation] = useState('');
	const [job, setJob] = useState('');
	const [bio, setBio] = useState('');
	const [workImages, setWorkImages] = useState([]);
	const [rate, setRate] = useState('');
	const [bioCount, setBioCount] = useState(0);
	const [loading, setLoading] = useState(false);

	const convertToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		let encodedImage;
		const encodedImages = [];

		if (image) {
			encodedImage = await convertToBase64(image);
		}

		if (workImages) {
			for (const image of workImages) {
				let encoded = await convertToBase64(image);
				encodedImages.push(encoded);
			}
		}

		const dataToSend =
			mode === 'service person'
				? {
						phone_no: phone,
						location,
						profile_image: encodedImage,
						category: job,
						description: bio,
						work_images: encodedImages,
						rates: rate,
				  }
				: { phone_no: phone, location, profile_image: encodedImage };

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

	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			// setImage(URL.createObjectURL(e.target.files[0]));
			setImage(e.target.files[0]);
		}
		console.log(image);
	};

	const storeWorkImagesInState = (e) => {
		if (e.target.files) {
			if (e.target.files.length > 4) {
				alert('You can only upload up to 4 photos');
			}
			for (const image of e.target.files) {
				setWorkImages((prevState) => [image, ...prevState]);
			}
		}
	};

	return (
		<>
			<Head>
				<title>Build your profile</title>
			</Head>

			<nav className='py-5 px-8 mb-5'>
				<Logo />
			</nav>

			<main className='px-8 mx-auto scroll-smooth'>
				<h1 className='text-center font-secondary font-bold text-3xl'>
					One more step to go {name}
				</h1>
				<section>
					<form onSubmit={handleSubmit} className='w-4/6 md:w-1/6 mx-auto my-9'>
						<div className='mb-7'>
							<label htmlFor='phone'>Enter your phone number</label>
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
							<label htmlFor='picture'>Add a profile picture</label>
							<input
								type='file'
								name='picture'
								id='picture'
								accept='image/png, image/gif, image/jpeg'
								onChange={onImageChange}
							/>
							{image && (
								<div className='relative mt-4 w-64 h-64 mx-auto'>
									<Image
										src={URL.createObjectURL(image)}
										alt='Your profile picture'
										layout={'fill'}
										objectFit={'contain'}
										quality={100}
									/>
								</div>
							)}
						</div>
						<div className='mb-7'>
							{mode === 'client' ? (
								<label htmlFor='location'>
									Enter your location (where service providers can find you)
								</label>
							) : (
								<label htmlFor='location'>
									Enter your location (where you operate)
								</label>
							)}
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
						{mode === 'service provider' && (
							<div>
								<h2 className='text-center font-secondary text-lg font-bold mb-4'>
									Let clients find out more about what you do
								</h2>
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
										class='
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
									{/* workImages && (
										<div className='flex mt-4 w-32 h-32 mx-auto'>
											{workImages.map((image, index) => {
												<li>
													<Image
														src={URL.createObjectURL(image)}
														alt='A picture of your work'
														layout={'fill'}
														objectFit={'contain'}
														quality={100}
														key={index}
													/>
												</li>;
											})}
										</div>
                    ) */}
								</div>
							</div>
						)}
						<button
							type='submit'
							className='w-4/6 bg-black text-white rounded-lg h-12 hover:w-5/6 hover:h-14 transform-all ease-in-out duration-700 object-center hover:text-xl'
							disabled={loading}
						>
							Complete Profile
						</button>
					</form>
				</section>
			</main>
		</>
	);
};

export default BuildProfile;
