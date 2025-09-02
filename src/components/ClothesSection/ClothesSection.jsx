import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css" 

function ClothesSection ( {handleCardClick, clothingItems} ) {

return (
<div className="clothes-section">
    <div className="add-new">
        <p>Your Items</p>
        <button className="add-button">+ Add New</button>
    </div>
    <ul className="cards__list">
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