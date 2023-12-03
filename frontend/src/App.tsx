import { useState } from 'react';
import Pannel from './layout/Pannel'
import Content from './layout/Content'
import './style/App.css';
function App() {
  const [info, setInfo] = useState({})
  return (
    <div id="App">
      <div className="main">
        <div className="pannel">
          <Pannel setInfo={setInfo} info={info} />
        </div>
        <div className="content">
          <Content info={info} />
        </div>
      </div>
    </div>
  )
}

export default App
