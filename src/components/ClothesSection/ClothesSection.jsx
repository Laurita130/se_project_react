import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

export default function ClothesSection({ handleCardClick, clothingItems, onAddItemClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__item">Your Item</p>
        <button onClick={onAddItemClick} className="clothes-section__display-item"> + Add Item</button>
      </div>
      <ul className="clothes-section__list" >
        {clothingItems?.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
