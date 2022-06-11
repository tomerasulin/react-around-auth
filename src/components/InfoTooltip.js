// This component is a modal window that informs the user whether they have been registered successfully
import success from '../images/Success.svg';
import fail from '../images/Fail.svg';

const InfoTooltip = ({ isOpen, onClose, text, isSuccess }) => {
  return (
    <div
      className={`popup-box popup-box_type_info ${
        isOpen ? 'popup-box_opened' : ''
      }`}
    >
      <div className='popup-box__container'>
        <button
          type='button'
          className='popup-box__close-btn'
          aria-label='Close'
          onClick={onClose}
        ></button>
        <div className='popup-box__form popup-box__form_auth'>
          <img
            className='popup-box__verify-image'
            src={isSuccess ? success : fail}
            alt={isSuccess ? 'Check mark' : 'Cross mark'}
          />
          <p className='popup-box__title popup-box__title_auth'>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
