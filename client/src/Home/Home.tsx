import "./Home.css";
import NavigationBar from "@/element/NavigationBar/NavigationBar";
import { useEffect, useState } from "react";
import Paginations from "@/element/pagination/Pagination";
import RestaurantContainer from "@/element/restaurantContainer/RestaurantConatiner";
import Categorie from "@/element/categories-item/Categorie";
import { useContexts } from "@/Context/context";
import Cart from "@/element/cart/Cart";
function Home() {
  let { getArrayElements, SetIsError, Categories, isLoading } = useContexts();
  //typing the shopItems
  interface items {
    ct?: Array<object>;
    n?: string;
    op?: Array<object>;
    cu?: Array<string>;
    t?: Number;
    busy?: boolean;
    rv: Number;
    se?: any;
    sc?: any;
    nm?: string;
    ad?: string;
    cc?: string;
    loc?: object;
    rd?: Number;
    rt?: Number;
    ofr?: Number;
    cs?: Number;
  }
  let [ShopItems, SetShopItems] = useState<Array<items>>([]);
  let [currentPage, setCurrentPage] = useState(1);
  const itemsNumber = 12;
  let lastindex = currentPage * itemsNumber;
  let firstindex = lastindex - itemsNumber;
  //for handling some typing issues, plannig for changing it later
  let posts = ShopItems.slice(firstindex, lastindex);
  let shopItemsLength = Number(ShopItems.length);

  //handling request
  const HandlingTheRequestedData = async () => {
    try {
      const pending = await getArrayElements("get-shop-details");
      if (
        pending &&
        typeof pending != "string" &&
        pending.message == "success" &&
        pending.data
      ) {
        return SetShopItems(pending.data);
      }
      if (
        pending &&
        typeof pending != "string" &&
        pending.message?.includes("error")
      )
        return SetIsError(pending.message);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    HandlingTheRequestedData();
  }, []);

  return (
    <>
      {/* this one need to be displayed on grid  */}
      <div className="home-parent">
        <div className="home-top-part">
          <NavigationBar />
        </div>
        <div className="home-holder">
          <div></div>
          <div className="home-holder-middle-part">
            <div className="home-holder-categories">
              <div className="home-holder-categories-title text-violet-700">
                Explore Categories
              </div>

              <div className="home-holder-categories-container">
                {Categories.map((e) => {
                  return <Categorie value={e} />;
                })}
              </div>
            </div>

            <div className="home-holder-restaurant">
              <div className="home-holder-restaurant-title text-violet-700">
                Our best selection
              </div>

              <div className="home-holder-restaurant-container">
                <div className="home-middle-part">
                  <RestaurantContainer loading={isLoading} posts={posts} />
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="home-bottom-part">
          <Paginations
            Setter={setCurrentPage}
            currentPage={currentPage}
            itemPerPage={itemsNumber}
            postsItems={shopItemsLength}
          />
        </div>
      </div>
      <Cart />
    </>
  );
}
export default Home;
