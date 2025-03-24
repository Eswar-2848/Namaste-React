import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";

const Home = () => {
  const [listOfRestaurants, setListOfRestaurants]=useState([]);
  const [filteredRestaurants, setFilteredRestaurants]=useState([]);
  const [searchText, setSearchText]=useState('');

  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=async()=>{
     const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9655152&lng=77.7184444&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
     const json=await data.json();
     setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
     setFilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  }
  
  const handleSearch=()=>{
    if(searchText===""){
      setListOfRestaurants([])
      fetchData();
    }
    else{
      const filteredRestaurants=listOfRestaurants.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase()))
      setFilteredRestaurants(filteredRestaurants);
    }
  }

  const handleKeyDown=(event)=>{
    if(event.key==='Enter'){
      handleSearch() 
    }
  }

  return listOfRestaurants.length===0 ? <Shimmer /> : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input type="text" placeholder="Search" value={searchText} onChange={(event)=>setSearchText(event.target.value)}  onKeyDown={handleKeyDown}/>
          <button onClick={()=>handleSearch(searchText)}>Search</button>
        </div>
        <button className="filter-btn" onClick={()=>{
          setListOfRestaurants(listOfRestaurants.filter(restaurant => restaurant.info.avgRating>4))
        }}>Top Rated Restaurants</button>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <Link to={"/restaurant/" + restaurant.info.id} key={restaurant.info.id}>
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;