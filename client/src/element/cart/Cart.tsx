import { useEffect, useState } from "react";
import "./Cart.css";
import { useContexts } from "@/Context/context";
import { useRef } from "react";
function Cart() {
  let {
    setIsOpen,
    isCartOpen,
    CartElement,
    total,
    DeleteFromCart,
    Change,
    Total,
  } = useContexts();
  let ref = useRef<{ [key: string]: HTMLInputElement | null }>({});

  return (
    <>
      <div
        className={
          isCartOpen ? "cart-component-closed" : "cart-component-opened"
        }
      >
        <img
          src="/shopping-cart.png"
          style={{ height: "30px", width: "30px", cursor: "pointer" }}
          onClick={() => setIsOpen(!isCartOpen)}
          alt=""
        />
        {isCartOpen ? (
          <div className={"cart-container"}>
            <div className="top-cart-part">
              {CartElement?.map(({ n, p, qte }) => {
                return (
                  <div className="element-in-cart-item">
                    <div className="element-in-cart-item-left-part">
                      <div className="element-in-cart-name ">{n}</div>
                      <div className="element-in-cart-price">{p} DA</div>
                    </div>
                    <div className="element-in-cart-item-right-part">
                      <input
                        className="element-in-cart-input"
                        type="number"
                        defaultValue={qte}
                        key={n}
                        ref={(element) => {
                          ref.current[n] = element;
                        }}
                        min={1}
                        onChange={() => Change(ref, n)}
                      />

                      <button onClick={() => DeleteFromCart(n)}>
                        <i
                          className="fa-solid fa-x text-purple-700"
                          style={{ color: "#000000;" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bottom-cart-part">
              <div className="bottom-cart-part-line"></div>

              <div className="bottom-cart-part-total-order">
                {" "}
                <div className="bottom-cart-part-total">
                  Total : {total} DA
                </div>{" "}
                <div className="bottom-cart-part-order">
                  <span className="bottom-cart-part-order-text">Order</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Cart;
