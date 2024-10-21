import "./Home.css";
import NavigationBar from "@/element/NavigationBar/NavigationBar";
import Restaurant from "../element/restaurant-item/restaurant";
function Home() {
  return (
    <>
      {/* this one need to be displayed on grid  */}
      <div className="home-parent">
        <div className="home-top-part">
          <NavigationBar />
        </div>
        <div className="home-middle-part">
          {/* here will be the display grid */}
          <Restaurant />
        </div>
      </div>
    </>
  );
}
export default Home;
