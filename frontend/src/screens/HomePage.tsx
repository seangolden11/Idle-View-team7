import Navbar from '../components/Navbar'
import Settings from '../components/Settings'
import AddWidgets from '../components/AddWidgets'
import { useState } from 'react'
import WeatherWidget from '../components/Widgets/WeatherWidget'

type Props = {
  onBackgroundChange: () => void;
  onBrightnessChange: (newBrightness: number) => void;
}

const HomePage: React.FC<Props> = ({onBackgroundChange,onBrightnessChange}) => {
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
      <WeatherWidget/>
      <Navbar onSettingsClick={toggleSettings} onAddButtonClick={toggleAddWidget} />
      {showSettings && <Settings onBackgroundChange={onBackgroundChange} onBrightnessChange={onBrightnessChange}/>}
      {showAddWidget && <AddWidgets/>}
    </>
  )
}

export default HomePage