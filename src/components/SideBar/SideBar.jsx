import defaultAvatar from '../../assets/avatar.png';
import './Sidebar.css';

function SideBar({ handleProfileClick, name, avatar, handleLogout }) {
  return (
    <div className="sideBar">
      <div>
        <img
          className="sidebar__avatar"
          src={avatar || defaultAvatar}
          alt="User avatar"
        />
      </div>
      <div>
        <p className="sidebar__username">{name}</p>
        <div className="sidebar__buttons">
          <button
            type="button"
            onClick={handleProfileClick}
            className="profile-data"
          >
            Change profile data
          </button>
          <button type="button" onClick={handleLogout} className="log-out">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
