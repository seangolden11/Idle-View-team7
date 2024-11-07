import React, { useState } from 'react';
import './Widget-Settings.css'
import { Clock } from './Clock/Clock';
import AddWidgets from './Clock/ClockWidget';
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
        /*return <div className="widgetContent">Time Widget Content</div>;*/
        return (
          <div className="widgetContent">
            <Clock /> {/* Clock 컴포넌트를 호출하여 시계 위젯을 렌더링 */}
          </div>
        );
      case 'More':
        return <div className="widgetContent">More Widget Content</div>;
      default:
        return null;
    }
  };

  /*const addWidget = () => {
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
  };*/

  return (
    <div className='wrapper'>
      <div className="left-sidebar">
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
      </div>
    </div>
  );
};

export default Settings;
