import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirmation from './PopupWithConfirmation';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { register, authorize, checkToken } from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSelectedCard, setIsSelectedCard] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [buttonText, setButtonText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);
  const [isFailPopup, setIsFailPopup] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setButtonText('Save');
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setButtonText('Save');
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setButtonText('Create');
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardClick(card) {
    setIsSelectedCard(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    setButtonText('Saving...');
    api
      .editProfile(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setButtonText('Save');
      });
  }

  function handleUpdateAvatar(avatar) {
    setButtonText('Saving...');
    api
      .updateProfilePic(avatar)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setButtonText('Save');
      });
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(console.log);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleAddPlaceSubmit(card) {
    setButtonText('Creating...');
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setButtonText('Create');
      });
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsSelectedCard(false);
    setIsSuccessPopup(false);
    setIsFailPopup(false);
  }

  function handleRegistration({ password, email }) {
    setButtonText('Signing up...');
    register({ password, email })
      .then(() => {
        setIsSuccessPopup(true);
        navigate('/signin');
      })
      .catch(() => {
        setIsFailPopup(true);
      })
      .finally(() => {
        setButtonText('Sign up');
      });
  }

  function handleLogin({ password, email }) {
    setButtonText('Logging in...');
    authorize({ password, email })
      .then((user) => {
        localStorage.setItem('jwt', user.token);
        setIsLoggedIn(true);
        setCurrentUser({ ...currentUser, email });
        setUserEmail(email);
        navigate('/');
      })
      .catch((e) => {
        setIsFailPopup(true);
      })
      .finally(() => setButtonText('Log in'));
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((data) => {
          setUserEmail(data.data['email']);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch(console.log);
    }
  }, []);

  useEffect(() => {
    //defining a function that handle the ESC button
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    const closeByMouseDown = (e) => {
      if (
        e.target.classList.contains('popup-box__close_btn') ||
        e.target.classList.contains('popup-box_opened')
      ) {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    document.addEventListener('mousedown', closeByMouseDown);

    //a clean up function to remove the listener whenever the component unmounts
    return () => {
      document.removeEventListener('keydown', closeByEscape);
      document.removeEventListener('mousedown', closeByMouseDown);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          emailUser={userEmail}
        />
        <InfoTooltip
          isOpen={isSuccessPopup}
          onClose={closeAllPopups}
          text='Success! You have now been registered.'
          isSuccess={true}
        />
        <InfoTooltip
          isOpen={isFailPopup}
          onClose={closeAllPopups}
          text='Oops, something went wrong! Please try again.'
          isSuccess={false}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={buttonText}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={buttonText}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={buttonText}
        />

        <PopupWithConfirmation
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={selectedCard}
        />
        <ImagePopup
          isOpen={isSelectedCard}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/signin'
            element={
              <Login
                onLogin={handleLogin}
                loggedIn={isLoggedIn}
                buttonText={'Log in'}
              />
            }
          ></Route>
          <Route
            path='/signup'
            element={
              <Register
                onRegistration={handleRegistration}
                loggedIn={isLoggedIn}
                buttonText={'Sign up'}
              />
            }
          ></Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
