import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    dispatch(addItem(item));
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
              <div className="absolute left-10/35 bottom-2">
                <button
                  className="p-2 bg-black text-white shadow-lg  my-auto rounded-lg cursor-pointer"
                  onClick={() => handleAddItem(item)}
                >
                  Add +
                </button>
              </div>
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
