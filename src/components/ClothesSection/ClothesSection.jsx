import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css"; 

function ClothesSection ( {handleCardClick, clothingItems} ) {

return (
<div className="clothes__section">
    <div className="add-new">
        <p>Your Items</p>
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