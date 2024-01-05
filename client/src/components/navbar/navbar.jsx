import Style from "../navbar/navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import { useDispatch } from "react-redux";
import { getDrivers, resetear } from "../../redux/actions/actions";
import { useEffect } from "react";

function Navbar( handleSubmit ) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const Exit = () => {
    dispatch(resetear());
    navigate("/");
  }

  return (
    <>
      <div className={Style.searchBox}>
        <NavLink to="/home">
          <button className={Style.button}>Home</button>
        </NavLink>
        <NavLink to="/form">
        <button className={Style.button}>Form</button>
        </NavLink>
          <button onClick={Exit}className={Style.button}>Exit</button>
        <SearchBar handleSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default Navbar;
