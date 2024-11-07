import React, { useState } from 'react';
import '../App.css';
import './Widget-Settings.css'

type Props = {
  onBackgroundChange: () => void;
  onBrightnessChange: (newBrightness:number) => void;
};

const Settings: React.FC<Props> = ({onBackgroundChange,onBrightnessChange}) => {
  const [activeWidget, setActiveWidget] = useState<string>('Display');
  const [brightness, setBrightness] = useState<number>(100); // Local state for brightness

  const handleWidgetSelection = (widget: string) => {
    setActiveWidget(widget);
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBrightness = Number(e.target.value);
    setBrightness(newBrightness); // Update local state
    onBrightnessChange(newBrightness); // Call parent component function
  };


  
  const renderWidget = () => {
    switch (activeWidget) {
      case 'Display':
        return <div className="widgetContent">Brightness Control
        <input className='brightness-input' 
          type="range"
          min="50"
          max="150"
          value={brightness} // Bind to local state
          onChange={handleBrightnessChange}/>
        </div>;

      case 'Power':
        return <div className="widgetContent">Power Settings Content</div>;
      case 'Customization':
        return (
          <button onClick={onBackgroundChange} className="widgetContent">Change Background</button>
        );
      case 'UserProfile':
        return <div className="widgetContent">User Profile Settings Content</div>;
      case 'Reset':
        return <div className="widgetContent">Reset Settings Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className='wrapper'>
    {/* Left Sidebar */}
      <div className="left-sidebar ">
          <button
            onClick={() => handleWidgetSelection('Display')}
            className={`button ${activeWidget === 'Display' ? 'buttonActive' : ''}`}
          >
            Display
          </button>
          <button
            onClick={() => handleWidgetSelection('Power')}
            className={`button ${activeWidget === 'Power' ? 'buttonActive' : ''}`}
          >
            Power
          </button>
          <button
            onClick={() => handleWidgetSelection('Customization')}
            className={`button ${activeWidget === 'Customization' ? 'buttonActive' : ''}`}
          >
            Custom
          </button>
          <button
            onClick={() => handleWidgetSelection('UserProfile')}
            className={`button ${activeWidget === 'UserProfile' ? 'buttonActive' : ''}`}
          >
            User Profile
          </button>
          <button
            onClick={() => handleWidgetSelection('Reset')}
            className={`button ${activeWidget === 'Reset' ? 'buttonActive' : ''}`}
          >
            Reset
          </button>
        </div>

      <div className="container">
        {/* Main Content Area */}
        <div className="contentArea">
          {renderWidget()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
