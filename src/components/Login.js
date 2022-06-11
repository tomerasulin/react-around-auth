// This component is for user authorization
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormValidation from './FormValidation';

const Login = ({ onLogin, loggedIn, buttonText }) => {
  const { values, errors, handleChange, resetForm } = FormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ password: values.password, email: values.email });
  };

  useEffect(() => {
    resetForm();
  }, [loggedIn]);

  return (
    <section className='user-form'>
      <form className='user-form__form' onSubmit={handleSubmit} name='register'>
        <h3 className='user-form__title'>Log in</h3>
        <input
          className='user-form__input'
          type='email'
          placeholder='Email'
          required
          onChange={handleChange}
          value={values.email || ''}
          name='email'
          id='email-input'
        />
        <span
          className={`title-input-error popup-box__error ${
            errors.email !== '' ? 'popup-box__error_visible' : ''
          }`}
        >
          {errors.email}
        </span>
        <input
          className='user-form__input'
          type='password'
          placeholder='Password'
          required
          onChange={handleChange}
          value={values.password || ''}
          name='password'
          id='password-input'
        />
        <span
          className={`title-input-error popup-box__error ${
            errors.password !== '' ? 'popup-box__error_visible' : ''
          }`}
        >
          {errors.password}
        </span>
        <button className='user-form__btn'>{buttonText}</button>
        <p className='user-form__text'>
          Not a member yet?{' '}
          <Link className='user-form__link' to='/signup'>
            Sign up here!
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
