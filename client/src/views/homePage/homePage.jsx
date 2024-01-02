import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, getTeams } from "../../redux/actions/actions";
import { orderCard, filterCard } from "../../redux/actions/actions";
import { useState } from "react";
import NavBar from "../../components/navbar/navbar";
import Cards from "../../components/cards/cards";
import Styles from "../homePage/homePage.module.css";

function HomePage() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);
  const allTeams = useSelector((state) => state.allTeams);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 9;

  //*Filtro con la Backend*//
  //const [searchString, setSearchString] = useState("");

  // function handleChange(e) {
  //   e.preventDefault();
  //   setSearchString(e.target.value);
  // }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   dispatch(getByName(searchString));
  // }

  //*Filtro sobre el estado*//
  // const [filtered, setFiltered] = useState(allDrivers);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const filtered = allDrivers.filter((driver) =>
  //     driver.forename.includes(searchString)
  //   );
  //   setFiltered(filtered);
  // }

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
    if (filters !== selectedTeam) {
      dispatch(filterCard(filters));
    }
  };
  //Botones de paginación
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allDrivers.length / driversPerPage); i++) {
    pageNumbers.push(i);
  }
  // Agrega el siguiente código para realizar la paginación
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = allDrivers.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.flag}>
          <h2 className={Styles.text}>DRIVERS FROM NICOLAS CUELLO</h2>
        </div>
      </div>
      <div className={Styles.containerFiltros}>
        <select name="Orden" onChange={handlerOrder}>
          <option value="AZ">Orden alfabetico Ascendente</option>
          <option value="ZA">Orden alfabetico Descendente</option>
          <option value="Fa">Fecha de nacimiento Ascendente</option>
          <option value="FD">Fecha de nacimiento Descendente</option>
        </select>

        <select name="filtrado" onChange={handlerFilter} value={setSelectedTeam}>
          <option value="Todos">Todos los teams</option>
          {allTeams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
        <NavBar/>

      <div className={Styles.home}>
        <Cards allDrivers={currentDrivers} />
        <div className={Styles.paginations}>
          {pageNumbers.map((number) => (
            <button key={number} onClick={() => paginate(number)}>
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
