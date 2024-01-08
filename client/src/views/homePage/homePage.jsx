import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrivers,
  getTeams,
  orderCard,
  filterCard,
  setCurrentPage,
} from "../../redux/actions/actions";
import NavBar from "../../components/navbar/navbar";
import Cards from "../../components/cards/cards";
import Styles from "../homePage/homePage.module.css";

function HomePage() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const allTeams = useSelector((state) => state.allTeams);
  const currentPage = useSelector((state) => state.currentPage);
  const filterState = useSelector((state) => state.filterState);
  const driversPerPage = 9;

  useEffect(() => {
    dispatch(getDrivers());
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

  //Botones para mostrar segun cantidad de drivers
  let pageNumbers = [];

  if (filterState.length > 0) {
    for (let i = 1; i <= Math.ceil(filterState.length / driversPerPage); i++) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = 1; i <= Math.ceil(allDrivers.length / driversPerPage); i++) {
      pageNumbers.push(i);
    }
  }
  // Boton para navegar a la pagina anterior
  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  // Navegación a la siguiente página
  const handleNextPage = () => {
    const pageNumbers =
      filterState.length > 0
        ? Math.ceil(filterState.length / driversPerPage)
        : Math.ceil(allDrivers.length / driversPerPage);

    if (currentPage < pageNumbers) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  // Boton del medio
  const middlePageButtons = Array.from(
    { length: 1 },
    (_, index) => currentPage + index
  );

  // Paginación
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;

  const mostrarFiltrado = filterState.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );
  const currentDrivers = allDrivers.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <>
      <div className={Styles.containerTitulo}>
          <h2 className={Styles.text}>DRIVERS </h2>
      </div>
      <div className={Styles.containerFiltros}>
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
      </div>
      <NavBar />
      <div className={Styles.home}>
        <Cards
          allDrivers={
            mostrarFiltrado.length > 0 ? mostrarFiltrado : currentDrivers
          }
        />
      </div>
      <div className={Styles.paginations}>
        <button
          className={Styles.buttonPage}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className={Styles.spans}></span>
        {middlePageButtons.map((number) => (
          <button
            className={`${Styles.buttonPage} ${
              number === currentPage ? Styles.active : ""
            }`}
            key={number}
            onClick={() => paginate(number)}
            disabled={number > pageNumbers}
          >
            {number}
          </button>
        ))}
        <span className={Styles.spans}></span>
        <button
          className={Styles.buttonPage}
          onClick={handleNextPage}
          disabled={currentPage === pageNumbers}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default HomePage;
