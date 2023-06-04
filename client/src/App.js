import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import WebRoute from './Router';
function App() {
  library.add(fas)
  return (
    <div className="App">
        <WebRoute/>
    </div>
  );
}

export default App;
