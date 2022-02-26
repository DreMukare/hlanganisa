import Tooltip from './tooltip';

export default function Button({ onClick, style, text, tooltip }) {
	return (
		<div>
			<button
				data-tooltip-target='tooltip-default'
				onClick={onClick}
				className={`${style} max-w-96 min-w-100 h-16 rounded-lg`}
			>
				{text}
			</button>
			<Tooltip id='tooltip-default' text={tooltip} />
		</div>
	);
}
