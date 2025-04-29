import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { useLocation } from "react-router-dom";
const ItemList = ({ items }) => {
  const location = useLocation();
  const cartPage = location.pathname === "/cart";
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };
  return (
    <div>
      {items.map((item) => {
        return (
          <div
            data-testid="foodItems"
            key={item.card.info.id}
            className="flex border-gray-200 border-b-2 justify-between"
          >
            <div className="p-2 m-2 text-left w-9/12">
              <div className="py-2">
                <span>{item.card.info.name}</span>
                <span>
                  {" "}
                  - ₹{" "}
                  {item.card.info.price
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100}
                </span>
              </div>
              <p className="text-xs">{item.card.info.description}</p>
            </div>
            <div className="relative p-4 w-3/12">
              {!cartPage ? (
                <div className="absolute left-10/35 bottom-2">
                  <button
                    className="p-2 bg-black text-white shadow-lg  my-auto rounded-lg cursor-pointer"
                    onClick={() => handleAddItem(item)}
                  >
                    Add +
                  </button>
                </div>
              ) : (
                <div className="absolute left-9/35 bottom-2">
                  <button
                    className="p-2 bg-black text-white shadow-lg my-auto rounded-lg cursor-pointer"
                    onClick={() => handleRemoveItem(item)}
                  >
                    -
                  </button>
                  <span className="border border-black p-2 rounded-lg shadow-lg text-white">
                    {item.count}
                  </span>
                  <button
                    className="p-2 bg-black text-white shadow-lg my-auto rounded-lg cursor-pointer"
                    onClick={() => handleAddItem(item)}
                  >
                    +
                  </button>
                </div>
              )}
              <img
                className="w-full h-30 rounded-lg"
                alt="res-item"
                src={CDN_URL + item.card.info.imageId}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ItemList;
