
/*import Navbar from '../components/Navbar'
import Settings from '../components/Settings'
import AddWidgets from '../components/AddWidgets'
import { useState } from 'react'

type Props = {}

const HomePage = (props: Props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showAddWidget, setShowAddWidget] = useState(false);

  const toggleSettings = () => {
    setShowSettings(prevState => !prevState)
  }

  const toggleAddWidget = () => {
    setShowAddWidget(prevState => !prevState)
  }

  return (
    <>
      <Navbar onSettingsClick={toggleSettings} onAddButtonClick={toggleAddWidget}/>
      {!showAddWidget && showSettings && <Settings/>}
      {!showSettings && showAddWidget && <AddWidgets/>}
    </>
  )
}

export default HomePage */

// HomePage.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AddWidgets from '../components/AddWidgets';
import Settings from '../components/Settings';
import WidgetsContainer from '../components/WidgetContainer';
import styles from '../components/Overlay.module.css';

type Widget = { id: number; type: string; x: number; y: number };

const HomePage = () => {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [widgetCounter, setWidgetCounter] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddWidget, setShowAddWidget] = useState(false);

  const addWidget = (type: string) => {
    setWidgets([...widgets, { id: widgetCounter, type, x: 0, y: 0 }]);
    setWidgetCounter(widgetCounter + 1);
  };

  const toggleSettings = () => {
    setShowSettings(prevState => !prevState)
  }

  const toggleAddWidget = () => {
    setShowAddWidget(prevState => !prevState)
  };

  return (
    <>
      <Navbar onSettingsClick={toggleSettings} onAddButtonClick={toggleAddWidget}/>
      {!showAddWidget && showSettings && <div className={styles.overlay}> 
          <Settings/> 
        </div>}
      {showAddWidget  && !showSettings && <div className={styles.overlay}>
          <AddWidgets onAddWidget={addWidget} />
        </div>}
      <WidgetsContainer widgets={widgets} />
    </>
  )

  
};

export default HomePage;
