import { useParams, useRouteError } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu"
import Shimmer from "./Shimmer";

const RestaurantMenu=()=>{
    const {resId}=useParams();
    const err=useRouteError();

    const resInfo=useRestaurantMenu(resId);

    if(resInfo===null){
        return <Shimmer />
    }
    const {name, cuisines, costForTwoMessage}=resInfo?.cards[2]?.card?.card?.info;
    const {itemCards}=resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
    return(
        
        <div class="menu">
            <h1>{name}</h1>
            <h2>{cuisines.join(',')} - {costForTwoMessage}</h2>
            <ul>
                {itemCards && itemCards.length > 0 ? (itemCards.map((item) => <li key={ item.card.info.id }>{item.card.info.name}- Rs.{item.card.info.price/100 || item.card.info.defaultPrice/100}</li>)) : (<li>No Recommendations</li>)}
            </ul>
        </div>
    )
}

export default RestaurantMenu;