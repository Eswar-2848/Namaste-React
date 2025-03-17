import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import resList from "../utils/mockData";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants]=useState(resList);
  const [search, setSearch]=useState('')

  return (
    <div className="body">
      <input placeholder="Search" onChange={(event)=>setSearch(event.target.value)}/>
      <div className="filter">
        <button className="filter-btn" onClick={()=>{
          setListOfRestaurants(listOfRestaurants.filter(restaurant => restaurant.data.avgRating>4))
        }}>Top Rated Restaurants</button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.data.name} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;