import "./Home.css";
import NavigationBar from "@/element/NavigationBar/NavigationBar";

function Home() {
  return (
    <>
      {/* this one need to be displayed on grid  */}
      <div className="home-parent">
        <div className="home-top-part">
          <NavigationBar />
        </div>
      </div>
    </>
  );
}
export default Home;
