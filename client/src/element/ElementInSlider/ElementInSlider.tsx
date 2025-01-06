import { useEffect, useState } from "react";
import { useContexts } from "@/Context/context";
import "./ElementInSlider.css";
import ImageComponent from "../imageComponent/ImageComponent";

interface propsType {
  myValue: {
    n: string;
    p: number;
    i: string;
  };
}

function ElementInSlider(props: propsType) {
  let { setSrc, AddToCart } = useContexts();
  let { myValue } = props;
  let { n, i, p } = myValue;

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
