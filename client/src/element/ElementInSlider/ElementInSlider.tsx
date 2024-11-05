import { useEffect, useState } from "react";
import { useContexts } from "@/Context/context";
import "./ElementInSlider.css";
import ImageComponent from "../imageComponent/imageComponent";

interface propsType {
  myValue: {
    n: string;
    p: number;
    i: string;
  };
}
interface itemsInCartArray {
  n: string;
  p: number;
  qte: number;
}
const CheckIfIsDefined = (argument: itemsInCartArray | undefined) => {
  if (
    argument &&
    argument.n &&
    argument.p &&
    argument.p > 0 &&
    argument.n.length > 2
  ) {
    return true;
  }
  return false;
};
function ElementInSlider(props: propsType) {
  let DefaultImage = "/itemBackground.webp";

  let [src, setSrc] = useState("");
  let { isLoading, AddToCart } = useContexts();
  let { myValue } = props;
  let { n, i, p } = myValue;
  const handleimage = () => {
    return setSrc(DefaultImage);
  };
  useEffect(() => {
    setSrc("https://food.yassir.io/" + i);
  }, [myValue]);
  return (
    <div className="element-in-slider-container">
      <div className="element-in-slider-container-top-part">
        <ImageComponent
          path={"https://food.yassir.io/" + i}
          classename={"element-in-slider-image"}
          style={{ borderRadius: "20px" }}
        />
      </div>
      <div className="element-in-slider-container-middle-part">
        <div className="element-in-slider-big-title text-violet-700">{n}</div>
        <div className="element-in-slider-price">
          <div className="element-in-slider-price-number text-violet-700">
            {p?.toString()}
          </div>
          <div className="element-in-slider-price-country text-violet-700">
            DZ
          </div>
        </div>
      </div>
      <div className="element-in-slider-container-middle-part">
        <div
          className="element-in-slider-cart-emoji"
          onClick={() => {
            AddToCart({ n: n, p: p, qte: 1 });
          }}
        >
          <img
            src="/plus.png"
            style={{ height: "20px", width: "20px", cursor: "pointer" }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default ElementInSlider;
