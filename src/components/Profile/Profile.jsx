import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ handleCardClick, clothingItems, handleAddClick, handleProfileClick, name }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar 
        handleAddClick={handleAddClick}
        handleProfileClick={handleProfileClick}
        name={name}/>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
