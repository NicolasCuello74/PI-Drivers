import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css"
import LandingPage from "./views/landingPage/landingPage";
import HomePage from "./views/homePage/homePage";
import DetailPage from "./views/detailPage/detailPage";
import CreateForm from "./views/createForm/createForm";
import NotFound from "./views/notFound/NotFound";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/form" element={<CreateForm />} />
          <Route path="/*" element={<NotFound message="Page"/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
