import Navbar from '../components/Navbar'
import Settings from '../components/Settings'
import AddWidgets from '../components/AddWidgets'
import { useState } from 'react'

type Props = {
  onBackgroundChange: () => void;
  onBrightnessChange: (newBrightness: number) => void;
}

const HomePage: React.FC<Props> = ({onBackgroundChange,onBrightnessChange}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [navbarColor, setNavbarColor] = useState("defaultColor");

  const toggleSettings = () => {
    setShowSettings(prevState => !prevState)
  }

  const toggleAddWidget = () => {
    setShowAddWidget(prevState => !prevState)
  }

  const handleSidebarColorChange = (newColor: string) => {
    setNavbarColor(newColor);
  }

  return (
    <>
      <Navbar onSettingsClick={toggleSettings} onAddButtonClick={toggleAddWidget} color={navbarColor}/>
      {showSettings && <Settings onBackgroundChange={onBackgroundChange} onBrightnessChange={onBrightnessChange} onSidebarColorChange={handleSidebarColorChange}/>}
      {showAddWidget && <AddWidgets/>}
    </>
  )
}

export default HomePage