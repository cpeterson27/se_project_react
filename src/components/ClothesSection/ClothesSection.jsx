import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css"; 

function ClothesSection ( {handleCardClick, clothingItems, handleAddClick} ) {

return (
<div className="clothes__section-list">

  <div className="clothes__section-text">
    <div className="your-items">
        <p>Your Items</p>
    </div>
     <button
        onClick={handleAddClick}
        type="button"
        className="add-clothes-btn"
      >
        + Add new
      </button>
</div>
      
    <ul className="clothes__section">
          {clothingItems.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
</div>
);

}

export default ClothesSection