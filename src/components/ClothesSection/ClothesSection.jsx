import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ handleAddClick, handleCardClick, clothingItems, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Filter to show only items owned by current user
  const userItems = clothingItems.filter((item) => item.owner === currentUser?._id);

  return (
    <div className="clothes__section">
      <div className="clothes__header">
        <p className="clothes__title">Your items</p>
        <button onClick={handleAddClick} className="clothes__add-btn">
          + Add new
        </button>
      </div>
      <ul className="clothes__list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;