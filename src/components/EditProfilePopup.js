import PopupWithForm from './PopupWithForm';
import React from 'react';
import useFormAndValidation from '../hooks/useFormAndValidation';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ onUpdateUser, isOpen, onClose, buttonText }) => {
  const { isValid, values, errors, handleChange, resetForm, setValues } =
    useFormAndValidation();
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault();
    // Pass the values of the managed components to the external handler
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  React.useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name='edit'
      title='Edit profile'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id='name-input'
        type='text'
        name='name'
        placeholder='Name'
        className='popup-box__input popup-box__input_type_name'
        required
        minLength='2'
        maxLength='40'
        value={values.name || ''}
        onChange={handleChange}
      />
      <span
        className={`title-input-error popup-box__error ${
          errors.name !== '' ? 'popup-box__error_visible' : ''
        }`}
      >
        {errors.name}
      </span>
      <input
        id='about-input'
        type='text'
        name='about'
        placeholder='About me'
        className='popup-box__input popup-box__input_type_about'
        required
        minLength='2'
        maxLength='200'
        value={values.about || ''}
        onChange={handleChange}
      />
      <span
        className={`title-input-error popup-box__error ${
          errors.about !== '' ? 'popup-box__error_visible' : ''
        }`}
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
