export default function Buttons(props) {
  return (
    <button
      onClick={() => props.hold(props.id)}
      className={props.isHeld ? "die-button" : null}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, ${
        props.isHeld ? "held" : "not held"
      }`}
    >
      {props.value}
    </button>
  );
}
