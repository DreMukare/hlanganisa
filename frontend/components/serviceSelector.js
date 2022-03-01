import { useState } from 'react';
import Select from 'react-select';
import ServiceDisplay from '../components/serviceDisplay';
import SectionHeading from '../components/sectionHeading';

const services = [
	{ label: 'Plumber', value: 'plumber' },
	{ label: 'Cleaner', value: 'cleaner' },
	{ label: 'Cook', value: 'cook' },
	{ label: 'Electrician', value: 'electrician' },
	{ label: 'Dog Walker', value: 'dog walker' },
	{ label: 'Dog Groomer', value: 'dog groomer' },
	{ label: 'Salonist', value: 'salonist' },
	{ label: 'Masseuse', value: 'masseuse' },
	{ label: 'Music Teacher', value: 'music teacher' },
	{ label: 'Other', value: 'other' },
];

const ServiceSelector = () => {
	const [selectedService, setSelectedService] = useState();

	return (
		<section className='my-5'>
			<SectionHeading text='Select Service' />
			<p className='mb-2'>Select the service you need</p>
			<Select
				className='mb-2'
				options={services}
				onChange={setSelectedService}
				defaultValue={selectedService}
				isClearable={true}
			/>
			{selectedService ? (
				<ServiceDisplay selected={selectedService.value} />
			) : (
				<p className='hidden'>Select a service</p>
			)}
		</section>
	);
};

export default ServiceSelector;
