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
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
      <button
      onClick={handleLikeClick}
      className="heart__button"
      > {liked ? <AiFillHeart /> : <AiOutlineHeart />}
</button>
    </li>
  );
}

export default ItemCard;
