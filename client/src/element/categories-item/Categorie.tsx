import "./Categorie.css";

interface PropsType {
  value: element;
}
type element = {
  path?: string;
  text?: string;
};

function Categorie(props: PropsType) {
  let { value } = props;
  let { path, text } = value;
  return (
    <div className="categorie-item-container bg-slate-100 ">
      <div className="categorie-item-image">
        <img src={path} alt="" style={{ height: "50px", width: "50px" }} />
      </div>
      <div className="categorie-item-text text-violet-700">{text}</div>
    </div>
  );
}
export default Categorie;
