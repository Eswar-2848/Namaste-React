import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import ItemList from "./ItemList";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="text-center p-4 m-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      {cartItems.length === 0 && <h1>Cart is empty. Add Items to the cart!</h1>}
      {cartItems.length !== 0 && (
        <>
          <button
            className="p-2 m-2 bg-black text-white rounded-lg cursor-pointer"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
            <ItemList items={cartItems} />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
