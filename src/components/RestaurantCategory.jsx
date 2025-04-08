import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data }) => {
  const [accordionStatus, setAccordionStatus] = useState(false);
  return (
    <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
      {/* Header */}
      <div className="flex justify-between">
        <span className="font-bold text-lg">
          {data.title} ({data.itemCards.length})
        </span>
        <button
          onClick={() => setAccordionStatus((prevState) => !prevState)}
          className={`transform transition-transform ${
            accordionStatus ? "rotate-180" : "rotate-0"
          }`}
        >
          🔽
        </button>
      </div>
      {/* AccordionBody */}
      {accordionStatus && <ItemList items={data.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
