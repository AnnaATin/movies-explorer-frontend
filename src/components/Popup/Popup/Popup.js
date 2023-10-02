import { useEffect } from "react";
import './Popup.css';

const Popup = ({ isOpen, name, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])
 
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }
 
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onMouseDown={handleOverlay}
    >
      <div className='popup__block'>
        {children}
        <button
          type="button"
          className="popup__close-button"
          name="button_form_close"
          id="button_form-add_close"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
