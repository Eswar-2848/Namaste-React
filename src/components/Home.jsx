import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import Shimmer from "./Shimmer";

const Home = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  const { loggedInUser, setUserName } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9655152&lng=77.7184444&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const handleSearch = () => {
    if (searchText === "") {
      setListOfRestaurants([]);
      fetchData();
    } else {
      const filteredRestaurants = listOfRestaurants.filter((res) =>
        res.info.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRestaurants(filteredRestaurants);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("keydown called");
      handleSearch();
    }
  };
  if (!onlineStatus)
    return (
      <h1>Looks like you're offline!! please check your internet connection</h1>
    );
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            data-testid="searchInput"
            className="border border-solid border-black"
            placeholder="Search"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg cursor-pointer"
            onClick={() => handleSearch(searchText)}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => {
              setFilteredRestaurants(
                filteredRestaurants.filter(
                  (restaurant) => restaurant.info.avgRating > 4
                )
              );
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <label> UserName : </label>
          <input
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants.length === 0 ? (
          <p>No restaurants found</p>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <Link
              to={"/restaurant/" + restaurant.info.id}
              key={restaurant.info.id}
            >
              {restaurant.info?.promoted ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
