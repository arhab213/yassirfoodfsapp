import "./Button.css";
interface PropsType {
  text?: string;
  color?: string;
  className: string;
  length?: string;
}
function Button(props: PropsType) {
  let { text, color, className, length } = props;
  return (
    <>
      <button
        className={"button-parent basic-button " + `${className}`}
        style={{ color: `${color}`, width: `${length}` }}
      >
        {text}
      </button>
    </>
  );
}
export default Button;
