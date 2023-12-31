import Style from "../navbar/navbar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";

function Navbar( handleSubmit ) {

  return (
    <>
      <div className={Style.searchBox}>
        <Link to="/home">
          <button className={Style.button}>Home</button>
        </Link>
        <Link to="/form">
        <button className={Style.button}>Form</button>
        </Link>
        <SearchBar handleSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default Navbar;
