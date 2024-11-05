import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Exporting from "@/CONFIG";
let { Errors } = Exporting;
import { useContexts } from "@/Context/context";
import "./Uniquepage.css";
import Cart from "../cart/Cart";

import Slider from "react-slick";
import ElementInSlider from "../ElementInSlider/ElementInSlider";
function Uniquepage() {
  let params = useParams();
  let { id } = params;
  type FoodElemnt = {
    n: string;
    _id: string;
    v: number;
    ct: string;
    o: number;
    i: string;
    p: number;
  };

  interface CategoriesType {
    l: FoodElemnt[];
    _id: string;
    n: string;
    i: string;
    o: Number;
  }

  interface items {
    ct: CategoriesType[];
    n: string;
    ad: string;
    rt: number;
    i: string;
  }

  //defining the settiings of the slider

  let [ShopDetails, setShopDetails] = useState<items | null>({
    ct: [],
    n: "",
    ad: "",
    rt: 0,
    i: "",
  });

  let [categories, setCategories] = useState<CategoriesType[]>([]);
  let { getUniqueElement, isError, isLoading, SetIsLoading, SetIsError } =
    useContexts();

  const HandlingRequest = async (id?: string) => {
    try {
      const pending = await getUniqueElement("get-unique-shop-details", id);
      if (pending && typeof pending == "string" && pending.includes("error")) {
        return SetIsError(Errors[pending]);
      }
      if (pending && typeof pending != "string" && pending.data) {
        setShopDetails(pending.data);
        setCategories(pending.data.ct || []);
      }
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    HandlingRequest(id);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  useEffect(() => {
    if (ShopDetails && ShopDetails.i.length > 1) {
      SetIsLoading(false);
    }
  }, [ShopDetails]);

  return (
    <>
      {isLoading ? (
        <div className="loading-component-conatiner">
          <img src="/loding-logo.svg" alt="" className="loading-image" />
          <div className="loading-component ">
            <span className="loader"></span>
          </div>
        </div>
      ) : (
        <div className="container">
          {ShopDetails && ShopDetails.i.length > 1 ? (
            <>
              <div className="unique-page-top-part">
                {ShopDetails.i.length > 1 ? (
                  <img
                    className="unique-page-top-part-image"
                    src={"https://food.yassir.com/" + ShopDetails.i}
                    alt=""
                  />
                ) : null}
                <div className="emoji-heart-others-container">
                  <div className="heart-emoji big-image-emojis">
                    <img
                      src="/heart.png"
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                    />
                  </div>
                  <div className="other-emoji big-image-emojis">
                    <img
                      src="/ellipsis.png"
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                    />
                  </div>
                </div>
                <div className="unique-page-top-part-title">
                  {ShopDetails.n}
                </div>
                <div className="smalest-title-for-rating-and-adress">
                  <div className="unique-page-rating-container">
                    <span className="unique-page-icon-component material-symbols-outlined text-violet-700">
                      grade
                    </span>
                    <span className="unique-page-rating-text text-violet-900">
                      {Math.floor(ShopDetails.rt).toString()}
                    </span>
                  </div>
                  <div className="unique-page-adress">{ShopDetails.ad}</div>
                </div>
              </div>

              <div className="unique-page-middle-part">
                {categories.length > 0
                  ? categories.map(({ l, n }) => {
                      return (
                        <div key={n} className="categories-conatianer">
                          <div className="catergories-conatiner-title  text-violet-700 ">
                            {n}
                          </div>
                          <div className="categories-container-slider">
                            <Slider {...settings}>
                              {l
                                ? l.map((e) => {
                                    let { n, p, i } = e;
                                    let intermediaire = { n: n, p: p, i: i };

                                    return (
                                      <ElementInSlider
                                        key={n}
                                        myValue={intermediaire}
                                      />
                                    );
                                  })
                                : null}
                            </Slider>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>

              <div className="unique-page-bottom-part">
                <Cart />
              </div>
            </>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Uniquepage;
