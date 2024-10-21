import "./restaurant.css";

import Button from "../Button/Button";
interface PropsType {}

function Restaurant() {
  return (
    <>
      <div className="restaurant-parent">
        <div className="top-part-restaurant"></div>
        <div className="middle-part-restaurant">
          <div className="write-bold-restaurant">Taj Mahal</div>
          <div className="speciality">indian</div>
          <div className="availablity">
            <div className="green-circle bg-green-400"></div>
            <div className="status text-green-500">available</div>
          </div>
          <div className="price-and-orders-holders">
            <div className="price text-violet-900">300 Da</div>
            <div className="orders">
              <span className="order-number">+22</span>
              <span className="icon">
                <span className=" icon-component material-symbols-outlined">
                  shopping_cart
                </span>
              </span>
            </div>
          </div>
        </div>
        <div
          className="bottom-part-restaurant"
          style={{ display: "flex", justifyContent: "center", gap: "2%" }}
        >
          <Button
            className="bg-violet-900 text-white"
            text="See"
            length="140px"
          />
          <Button
            className="bg-zinc-300 text-slate-400"
            text="wishlist"
            length="140px"
          />
        </div>
      </div>
    </>
  );
}
export default Restaurant;
