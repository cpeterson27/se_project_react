import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile({ 
  handleCardClick, 
  clothingItems, 
  handleAddClick, 
  handleProfileClick, 
  handleLogout,
  onCardLike
}) {

  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar 
          handleProfileClick={handleProfileClick}
          name={currentUser?.name}
          avatar={currentUser?.avatar}
          handleLogout={handleLogout}
        />
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
