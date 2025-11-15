import "./ItemCard.css";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';

function ItemCard({ item, onCardClick }) {
const [liked, setLiked] = useState(false);

const handleLikeClick = () => {
  setLiked(prev => !prev);
};

console.log('Full item object:', item);
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
      <button onClick={handleLikeClick} className="heart__button">
        {liked ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </div>
  </div>
    </li>
  );
}

export default ItemCard;
