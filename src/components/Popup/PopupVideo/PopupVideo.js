import { useContext } from 'react';
import Popup from '../Popup/Popup';
import { ApiServiceContext } from '../../../contexts/ApiServiceContext';
import Preloader from '../../AllMovies/Preloader/Preloader';

const PopupVideo = ({ isOpen, name, onClose, link = 'https://youtube.com/watch?v=dQw4w9WgXcQ' }) => {
  const { isLoading } = useContext(ApiServiceContext);

  const replaceLink = (link) => {
      return link.replace('/watch?v=', '/embed/');
  };

  return (
    <Popup
      isOpen={isOpen}
      name={name}
      onClose={onClose}
    >
      {isLoading && <Preloader />}
      {!isLoading && <iframe
        className='popup__trailer'
        src={replaceLink(link)}
        title={name}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />}
    </Popup>
  );
};

export default PopupVideo;
