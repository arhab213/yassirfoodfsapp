import "./NavigationBar.css";
import { useNavigate } from "react-router";

function NavigationBar() {
  let navigate = useNavigate();
  return (
    <>
      <div className="navbar-container">
        <div className="left-part">
          <div className="items-in-left logo ">
            <img
              src="/image.png"
              alt=""
              style={{ height: "50px", width: "px" }}
            />
          </div>
        </div>
        <div className="right-part">
          <div className="items-in-right">about us</div>
          <div className="items-in-right"> Contact us</div>
          <div
            className="items-in-right"
            onClick={() => {
              navigate("/admin/login");
            }}
          >
            Services
          </div>
        </div>
      </div>
    </>
  );
}
export default NavigationBar;
