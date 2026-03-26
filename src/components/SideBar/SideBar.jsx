import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
    const username = "Terrence Tegegne";
    const avatarUrl = avatar;





return ( <aside className="sidebar">
  <div className="sidebar__user-container">
          <p className="sidebar__username">{username}</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
    </aside>
  );
}