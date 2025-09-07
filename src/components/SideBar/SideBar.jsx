import avatar from "../../assets/avatar.png";
import "./Sidebar.css";

function SideBar() {

return (
<div className="sideBar">
<img className="sidebar__avatar" src={avatar} alt="Default avatar" />
<p className="sidebar__username">Terrence Tegegne</p>
</div>
);
}

export default SideBar;