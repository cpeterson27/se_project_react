import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ 
  handleCardClick, 
  clothingItems, 
  handleAddClick, 
  handleProfileClick, 
  handleLogout,
  currentUser,
  onCardLike
 }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar 
        handleAddClick={handleAddClick}
        handleProfileClick={handleProfileClick}
        name={currentUser?.name}
        avatar={currentUser?.avatar}
        handleLogout={handleLogout}/>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
