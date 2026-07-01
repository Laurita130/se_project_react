import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

export default function Profile({
  handleCardClick,
  clothingItems,
  onAddItemClick,
  onCardLike,
  onEditProfileClick,
  onLogout,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onLogout={onLogout} />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onAddItemClick={onAddItemClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
