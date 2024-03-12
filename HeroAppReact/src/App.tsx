import { AnimatePresence } from "framer-motion";
import "./App.css";

import NavBar from "./Components/NavBarComponent";
import { Route, Routes } from "react-router-dom";
import CarouselPage from "./Pages/CarouselPage";
import CharacterListPage from "./Pages/CharacterListPage";

function App() {
  return (
    <>
      <NavBar />
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<CarouselPage />} />
          <Route path="/list" element={<CharacterListPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
