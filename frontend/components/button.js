export default function Button({ onClick, style, text }) {
	return (
		<button
			onClick={onClick}
			className={`${style} max-w-96 min-w-100 h-16 rounded-lg`}
		>
			{text}
		</button>
	);
}
