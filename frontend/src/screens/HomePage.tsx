
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

import Navbar from '../components/Navbar'
import Settings from '../components/Settings'
import AddWidgets from '../components/AddWidgets'
import { WidgetsContainer } from '../components/Clock/ClockWidgetConTainer'
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
      {!showAddWidget && showSettings && <Settings />}
      {!showSettings && showAddWidget && <AddWidgets />}
      <WidgetsContainer />
    </>
  )
}

export default HomePage;

