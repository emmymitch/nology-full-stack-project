import './App.scss';

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Update from "./pages/Update/Update";
import Delete from "./pages/Delete/Delete";
import View from "./pages/View/View";
import Being from "./pages/Being/Being";

const App = () => {
  <Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/update" element={<Update />} />
    <Route path="/delete" element={<Delete />} />
    <Route path="/view" element={<View />} />
    <Route path="/view/:being" element={<Being />} />

{/* Redirect all other pages to home */}
    <Route path="*" element={<Navigate to="/home" replace />} />
  </Routes>
}

export default App;
