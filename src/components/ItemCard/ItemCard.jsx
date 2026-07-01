import "./ItemCard.css";
import { deleteItemHandler } from "../../utils/api.js";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked =
    currentUser._id && item.likes.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleDeleteClick = () => {
    deleteItemHandler(item._id)
      .then(() => {
        onCardClick(null);
      })
      .catch(console.error);
  };

  const handleLike = () => {
    onCardLike({
      id: item._id,
      isLiked,
    });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {currentUser._id && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
          />
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
