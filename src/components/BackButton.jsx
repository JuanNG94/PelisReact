import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/BackButton.css';

function BackButton({ onClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (onClick) {
      onClick();  // Limpiar búsqueda en Home
    } else if (location.pathname !== '/') {
      navigate('/');  // Volver al Home si estoy en detalle
    }
  };

  return (
    <div className="back-button">
      <button onClick={handleClick} className="back-text">
        ← Volver
      </button>
    </div>
  );
}

export default BackButton;

