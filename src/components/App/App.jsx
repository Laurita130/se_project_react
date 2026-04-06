import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { addItem, getItems, deleteItemHandler } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeAllModals();
      })
      .catch(console.error);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
    setIsAddModalOpen(true);
  };

  const closeAllModals = () => {
    setActiveModal("");
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    getWeather(
      {
        latitude: 26.715364,
        longitude: -80.0532942,
      },
      APIkey,
    )
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  const openDeleteConfirmation = (itemId) => {
    setActiveModal("delete-confirmation");
    setDeleteItemId(itemId);
  };

  const handleDeleteItem = () => {
    deleteItemHandler(deleteItemId)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== deleteItemId),
        );
        closeAllModals();
        setDeleteItemId(null);
      })
      .catch(console.error);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onAddItemClick={handleAddClick}
                />
              }
            />
          </Routes>

          <AddItemModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAddItem={onAddItem}
          />
          <Footer />
        </div>

        <AddItemModal
          onClose={closeAllModals}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
        />
        <ItemModal
          card={selectedCard}
          onClose={closeAllModals}
          isOpen={activeModal === "preview"}
          openDeleteConfirmation={openDeleteConfirmation}
        />

        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={closeAllModals}
          deleteHandler={handleDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
