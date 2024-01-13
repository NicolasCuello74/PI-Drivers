import Styles from "../navbar/navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  orderCard,
  filterCard,
  getTeams,
  borrarFiltros,
} from "../../redux/actions/actions";
import { useEffect } from "react";

function Navbar(handleSubmit) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allTeams = useSelector((state) => state.allTeams);
  const Exit = () => {
    dispatch(borrarFiltros());
    navigate("/");
  };

  const CleanFilter = () => {
    dispatch(borrarFiltros());
  };

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  //ORDENAMIENTO Y FILTRADO
  const handlerOrder = (e) => {
    e.preventDefault();
    const order = e.target.value;
    dispatch(orderCard(order)); //AZ o ZA que viene del evento..Fechas de nacimiento
  };
  const handlerFilter = (e) => {
    e.preventDefault();
    const filters = e.target.value;
    dispatch(filterCard(filters));
  };

  return (
    <>
      <div className={Styles.searchBox}>
        <button onClick={Exit} className={Styles.buttonExit}>
          Exit
        </button>
        <select className={Styles.select} name="Orden" onChange={handlerOrder}>
          <option value="AZ">Orden alfabetico A-Z</option>
          <option value="ZA">Orden alfabetico Z-A</option>
          <option value="Fa">Fecha de nacimiento Ascendente</option>
          <option value="FD">Fecha de nacimiento Descendente</option>
        </select>

        <select
          className={Styles.select}
          name="filtrado"
          onChange={handlerFilter}
        >
          <option value="Todos">Todos los teams</option>
          {allTeams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>

        <NavLink to="/form">
          <button className={Styles.button}>Crear Nuevo Driver</button>
        </NavLink>
        <button onClick={CleanFilter} className={Styles.button}>
          Clean Filters
        </button>
        <SearchBar handleSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default Navbar;
