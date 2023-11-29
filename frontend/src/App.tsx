import { useState } from 'react';
import Pannel from './layout/pannel'
import Content from './layout/content'
import './App.css';
function App() {
    return (
      <div id="App">
        <div className="main">
          <div className="pannel">
            <Pannel />
          </div>
          <div className="content">
            <Content />
          </div>
        </div>
      </div>
    )
}

export default App
