const ItemList = ({ items }) => (
  <div>
    {items.map((item) => {
      return (
        <div
          key={item.card.info.name}
          className="p-2 m-2 border-gray-200 border-b-2 text-left"
        >
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
      );
    })}
  </div>
);
export default ItemList;
