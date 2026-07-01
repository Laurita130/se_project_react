import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  handleCardClick,
  clothingItems,
  onAddItemClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter((item) => {
    return (
      item.owner === currentUser._id || item.owner?._id === currentUser._id
    );
  });
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__item">Your Item</p>
        <button
          onClick={onAddItemClick}
          className="clothes-section__display-item"
        >
          {" "}
          + Add Item
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems?.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
