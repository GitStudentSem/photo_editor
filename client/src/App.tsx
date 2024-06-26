import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FlipPage } from "./components/Flip/FlipPage";
import { RotatePage } from "./components/Rotate/rotatePage/RotatePage";
import { NegativePage } from "./components/Negative/NegativePage/NegativePage";

import { MainPage } from "./components/Main/MainPage";
import Root from "./components/Root/Root";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/flip' element={<FlipPage />} />
        <Route path='/rotate' element={<RotatePage />} />
        <Route path='/negative' element={<NegativePage />} />
        <Route path='/root' element={<Root />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
