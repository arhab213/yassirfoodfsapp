import "./restaurant.css";
import ImageComponent from "../imageComponent/ImageComponent";
import Button from "../Button/Button";
import { useNavigate } from "react-router";

interface PropsType {
  myvalue: {
    _id?: string;
    n?: string;
    a?: Number;
    ra?: number;
    ro?: string;
    i?: string;
  };
}

function Restaurant(props: PropsType) {
  let { myvalue } = props;
  let { a, ra, ro, n, i, _id } = myvalue;
  let navigate = useNavigate();
  return (
    <>
      <div
        className="restaurant-parent"
        onClick={() => navigate(`unique/${_id}`)}
      >
        <div className="top-part-restaurant">
          {i ? (
            <ImageComponent
              path={"https://food.yassir.com/" + i}
              classename={"h-200 w-270"}
              style={{ height: "200px", width: "270px", borderRadius: "25px" }}
            />
          ) : null}
        </div>
        <div className="middle-part-restaurant">
          <div className="write-bold-restaurant">{n}</div>
          <div className="speciality">{ro}</div>

          {a == 1 ? (
            <div className="availablity-open">
              <div className="green-circle-open bg-green-400"></div>
              <div className="status-open text-green-500">open</div>
            </div>
          ) : (
            <div className="availablity-closed">
              <div className="red-circle-closed bg-red-500"></div>
              <div className="status-open text-red-500">closed</div>
            </div>
          )}
          <div className="price-and-orders-holders">
            <div className="price text-violet-900">300 Da</div>
            <div className="orders">
              <span className="order-number">
                {ra ? ra.toFixed().toString() : null}
              </span>
              <span className="icon">
                <span className="icon-component material-symbols-outlined ">
                  grade
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
            className="bg-violet-700 text-white rounded-3xl hover:rounded-3xl"
            text="See"
            length="140px"
          />
          <Button
            className="bg-white text-violet-700 border-solid border-2 border-violet-700 rounded-3xl hover:rounded-3xl"
            text="wishlist"
            length="140px"
          />
        </div>
      </div>
    </>
  );
}
export default Restaurant;
