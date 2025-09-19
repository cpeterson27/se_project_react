import avatar from "../../assets/avatar.png";
import "./Sidebar.css";

function SideBar() {

return (
<div className="sideBar">
    <div>
<img className="sidebar__avatar" src={avatar} alt="Default avatar" />
</div>
<div>
<p className="sidebar__username">Terrence Tegegne</p>
<p className="profile-data">Change profile data</p>
<p className="log-out">Log out</p>
</div>
</div>

);
}

export default SideBar;