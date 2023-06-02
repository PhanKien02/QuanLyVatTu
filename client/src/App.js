import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import './App.css';
const Home = lazy(() => import('./layouts/home'));
const Auth = lazy(() => import('./layouts/auth'));
function App() {
  library.add(fas)
  return (
    <div className="App">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Suspense>
      </Router>
    </div>
  );
}

export default App;
