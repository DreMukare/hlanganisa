export default function Button({ onClick, style, text }) {
  return (
    <button onClick={onClick} className={`${style} w-96 h-16 rounded-lg`}>
      {text}
    </button>
  );
}
