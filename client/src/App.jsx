import { Routes, Route } from "react-router-dom";
import "./App.css";
import ImagenTitulo from "../public/F11.png";
import LandingPage from "./views/landingPage/landingPage";
import HomePage from "./views/homePage/homePage";
import DetailPage from "./views/detailPage/detailPage";
import CreateForm from "./views/createForm/createForm";
import NotFound from "./views/notFound/NotFound";
import Footer from "./components/footer/Footer";
function App() {
  return (
    <div className="App">
      <div className="Contenedor-Titulo">
        <h2 className="Titulo">DRIVERS </h2>
        <img className="Imagen-F11" src={ImagenTitulo} />
      </div>
        <Routes>
          <Route path="/*" element={<NotFound message="Page" />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/form" element={<CreateForm />} />
        </Routes>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
