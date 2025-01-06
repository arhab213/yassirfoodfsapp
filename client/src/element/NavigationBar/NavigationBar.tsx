import "./NavigationBar.css";

function NavigationBar() {
  return (
    <>
      <div className="navbar-container">
        <div className="left-part">
          <div className="items-in-left logo ">
            <img
              src="/image.png"
              alt=""
              style={{ height: "50px", width: "35px" }}
            />
          </div>
        </div>
        <div className="right-part">
          <div className="items-in-right">about us</div>
          <div className="items-in-right"> Contact us</div>
          <div className="items-in-right">Services</div>
        </div>
      </div>
    </>
  );
}
export default NavigationBar;
