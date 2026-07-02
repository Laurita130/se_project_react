import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import {
  addItem,
  getItems,
  deleteItemHandler,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { signup, signin, checkToken } from "../../utils/auth";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [deleteItemId, setDeleteItemId] = useState(null);


  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeAllModals();
      })
      .catch(console.error);
  };

 const closeAllModals = () => {
  setActiveModal("");
};

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    const token = localStorage.getItem("jwt");
    signup({ name, avatar, email, password })
      .then(() => {
        return signin({ email, password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeAllModals();
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    const token = localStorage.getItem("jwt");
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        closeAllModals();
      })
      .catch(console.error);
  };
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const request = isLiked
      ? removeCardLike(id, token)
      : addCardLike(id, token);

    request
      .then((updatedCard) => {
        const card = updatedCard.item || updatedCard.data || updatedCard;

        setClothingItems((items) =>
          items.map((item) => (item._id === id ? card : item)),
        );
      })
      .catch(console.error);
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
      .then(({ data }) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    checkToken(jwt)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      });
  }, []);

  const openDeleteConfirmation = (itemId) => {
    setActiveModal("delete-confirmation");
    setDeleteItemId(itemId);
  };

  const handleDeleteItem = () => {
    const token = localStorage.getItem("jwt");
    deleteItemHandler(deleteItemId, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== deleteItemId),
        );
        closeAllModals();
        setDeleteItemId(null);
      })
      .catch(console.error);
  };
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };
  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllModals();
      })
      .catch(console.error);
  };
  const handleLogout = () => {
    const token = localStorage.getItem("jwt");
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
    closeAllModals();
  };



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              handleLogout={handleLogout}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
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
                    onCardLike={handleCardLike}
                    onEditProfileClick={handleEditProfileClick}
                    onLogout={handleLogout}
                  />
                }
              />
            </Routes>

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
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeAllModals}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeAllModals}
            onLogin={handleLogin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeAllModals}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
