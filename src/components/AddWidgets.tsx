import React, { useState } from 'react';
import Navbar from './Navbar';
import '../App.css'; // Make sure the styles in App.css are defined correctly

type Props = {};

const Settings: React.FC<Props> = () => {
  const [activeWidget, setActiveWidget] = useState<string>('Media');

  const handleWidgetSelection = (widget: string) => {
    setActiveWidget(widget);
  };

  const renderWidget = () => {
    switch (activeWidget) {
      case 'Media':
        return <div className="widgetContent">Media Widget Content</div>;
      case 'Calendar':
        return <div className="widgetContent">Calendar Widget Content</div>;
      case 'Weather':
        return <div className="widgetContent">Weather Widget Content</div>;
      case 'Time':
        return <div className="widgetContent">Time Widget Content</div>;
      case 'More':
        return <div className="widgetContent">More Widget Content</div>;
      default:
        return null;
    }
  };

  return (
    <>
    <Navbar />
    <div className="sidebar">
        <button
          onClick={() => handleWidgetSelection('Media')}
          className={`button ${activeWidget === 'Media' ? 'buttonActive' : ''}`}
        >
          Media
        </button>
        <button
          onClick={() => handleWidgetSelection('Calendar')}
          className={`button ${activeWidget === 'Calendar' ? 'buttonActive' : ''}`}
        >
          Calendar
        </button>
        <button
          onClick={() => handleWidgetSelection('Weather')}
          className={`button ${activeWidget === 'Weather' ? 'buttonActive' : ''}`}
        >
          Weather
        </button>
        <button
          onClick={() => handleWidgetSelection('Time')}
          className={`button ${activeWidget === 'Time' ? 'buttonActive' : ''}`}
        >
          Time
        </button>
        <button
          onClick={() => handleWidgetSelection('More')}
          className={`button ${activeWidget === 'More' ? 'buttonActive' : ''}`}
        >
          More
        </button>
      </div>
      <div className="container">
      <div className="contentArea">{renderWidget()}</div>
      <div className="contentArea">{renderWidget()}</div>
    </div>
    </>
  );
};

export default Settings;
