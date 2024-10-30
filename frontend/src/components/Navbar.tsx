import { useState } from 'react';
import avatar from '../assets/avatar.png';
import log_out from '../assets/log_out.png';
import add from '../assets/add.png';
import settings from '../assets/settings.png';
import '../App.css';
import { useNavigate } from 'react-router-dom';

type Props = {}

const Navbar : React.FC<Props> = () => {
  
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/login');
  }
  const handleSettings= () => {
    navigate('/settings');
  }

  const handleAddWidgets = () => {
    navigate('/add-widgets');
  }
  
  // const [isOpen, setIsOpen] = useState(true);

  // const toggleNav = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div
        className="sidenav"
        // style={{ width: isOpen ? '200px' : '0' }}
      >
        <button className='avatar-button'>
          <img src={avatar} alt="Profile" />
        </button>
        <button className='add-button' onClick={handleAddWidgets}>
          <img src={add} alt="Add Widgets" />
        </button>
        <button className='settings-button' onClick={handleSettings}>
          <img src={settings} alt="Settings" />
        </button>
        <button className='exit-button' onClick={handleLogOut}>
          <img src={log_out} alt="Exit" />
        </button>
      </div>
  );
};

export default Navbar;
