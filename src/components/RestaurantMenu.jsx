import { useState } from "react";
import { useParams, useRouteError } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(0);
  const [itemsOpen, setItemsOpen] = useState(true);
  const { resId } = useParams();
  // const err = useRouteError();

  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) {
    return <Shimmer />;
  }
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;
  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  const handleChangeIndex = (index) => {
    setShowIndex((prevState) => {
      if (prevState === index) {
        setItemsOpen((prevState) => !prevState);
        return prevState;
      } else {
        setItemsOpen(true);
        return index;
      }
    });
  };

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(",")} - {costForTwoMessage}
      </p>
      {/* categories accordions */}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={itemsOpen && index === showIndex ? true : false}
          setShowIndex={() => handleChangeIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
