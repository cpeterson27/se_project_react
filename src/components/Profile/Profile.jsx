import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ handleCardClick, clothingItems, handleAddClick, handleProfileClick, name, avatar }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar 
        handleAddClick={handleAddClick}
        handleProfileClick={handleProfileClick}
        name={name}
        avatar={avatar}/>
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
