import "./SideBar.css";
import { useContext } from "react";
import avatar from "../../assets/avatar.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <img
          src={currentUser.avatar || avatar}
          alt={currentUser.name || "User"}
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser.name || "User"}</p>
      </div>

      <button
        type="button"
        className="sidebar__button"
        onClick={onEditProfileClick}
      >
        Change profile data
      </button>
      <button type="button" className="sidebar__button" onClick={onLogout}>
        Log out
      </button>
    </aside>
  );
}
