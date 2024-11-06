import './Navbar.css'
import avatarImg from '../assets/avatar.png';
import logoutButtonImg from '../assets/log_out.png';
import addButtonImg from '../assets/add.png';
import settingsButtonImg from '../assets/settings.png';
import { useNavigate } from 'react-router-dom';

type Props = {
  onSettingsClick: () => void;
  onAddButtonClick: () => void;
}

const Navbar : React.FC<Props> = ({onSettingsClick, onAddButtonClick}) => {
  
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/login');
  }

  return (
    <div className="sidebar">
      <button>
          <img src={avatarImg} alt="Profile" />
        </button>
        <button onClick={onAddButtonClick}>
          <img src={addButtonImg} alt="Add Widgets" />
        </button>
        <button onClick={onSettingsClick}>
          <img src={settingsButtonImg} alt="Settings" />
        </button>
        <button onClick={handleLogOut}>
          <img src={logoutButtonImg} alt="Exit" />
        </button>
    </div>
  );
};

export default Navbar;
