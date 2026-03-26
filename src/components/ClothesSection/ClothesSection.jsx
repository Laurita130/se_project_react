import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

export default function ClothesSection({ handleCardClick, clothingItems }) {
  return (
    <div className="clothes-section">
      <div className="close-section__row">
        <p>Text</p>
        <button>Button</button>
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
