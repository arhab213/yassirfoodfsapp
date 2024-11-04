import { useState } from "react";
import "./Cart.css";
import { useContexts } from "@/Context/context";
function Cart() {
  let { setIsOpen, isCartOpen } = useContexts();
  return (
    <>
      <div
        className={
          isCartOpen ? "cart-component-closed" : "cart-component-opened"
        }
        onClick={() => setIsOpen(!isCartOpen)}
      >
        <img
          src="/shopping-cart.png"
          style={{ height: "30px", width: "30px", cursor: "pointer" }}
          alt=""
        />
        {isCartOpen ? <div className={"cart-container"}></div> : null}
      </div>
    </>
  );
}

export default Cart;
