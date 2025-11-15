import "./ItemCard.css";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useContext } from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  
  const isLiked = item.likes?.includes(currentUser?._id);

  const handleLikeClick = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__image-container">
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
        />
        <div className="card__header">
          <h2 className="card__name">{item.name}</h2>
          {isLoggedIn && (
            <button onClick={handleLikeClick} className="heart__button">
              {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default ItemCard;
