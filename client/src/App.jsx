// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Styles from "./App.module.css"
import LandingPage from "./views/landingPage/landingPage";
import HomePage from "./views/homePage/homePage";
import DetailPage from "./views/detailPage/detailPage";
import CreateForm from "./views/createForm/createForm";
import NotFound from "./views/notFound/NotFound";
function App() {
  return (
    <div className={Styles.app}>
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
