const Greeting = ({ name }) => {
	return (
		<section>
			<h1 className='text-3xl font-bold font-secondary'>Hello</h1>
			<h2 className='text-5xl font-extrabold font-secondary'>{name}</h2>
		</section>
	);
};

export default Greeting;
