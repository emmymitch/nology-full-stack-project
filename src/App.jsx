import './App.scss';

import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Update from "./pages/Update/Update";
import Delete from "./pages/Delete/Delete";
import View from "./pages/View/View";
import Being from "./pages/Being/Being";
import Nav from './components/Nav/Nav';

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="col col--left">
          <Nav />
        </div>

        <div className="title">
          <div className='title__style-div'></div>
          <h1 className='title__text'>Greek Mythology Reference</h1>
          <div className='title__style-div'></div>
        </div>

        <div className='mobile-nav'>
          <Nav />
        </div>

        <div className="main">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/update" element={<Update />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/view" element={<View />} />
            <Route path="/view/:being" element={<Being />} />
          {/* Redirect all other pages to home */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>

        <div className="col col--right"></div>
      </div>
    </Router>
  )
}

export default App;
