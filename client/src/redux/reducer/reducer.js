import {
  GET_DRIVERS,
  GET_TEAMS,
  ORDER,
  FILTER,
  DETAIL,
  GET_BY_NAME,
  LOADING,
  POST_DRIVER,
} from "../actions/actions";

let initialState = {
  loading: false,
  allDrivers: [],
  driversCopy: [],
  driversFilter: [],
  allTeams: [],
  posts: [],
  detail: [],
  filterByTeam: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        driversCopy: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allDrivers: action.payload,
      };
    case POST_DRIVER:
      return {
        ...state
      };
    case GET_TEAMS:
      return {
        ...state,
        allTeams: action.payload,
      };
    case DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ORDER:
      const ordered = state.allDrivers.slice(); // Clona el array para evitar mutar el estado directamente
      ordered.sort((a, b) => {
        if (action.payload === "AZ") {
          return a.forename.localeCompare(b.forename); // Comparación de cadenas
        } else if (action.payload === "ZA") {
          return b.forename.localeCompare(a.forename); // Invierte el orden para descendente
        } else if (action.payload === "Fa") {
          return new Date(a.dob) - new Date(b.dob); // Comparación de fechas ascendente
        } else if (action.payload === "FD") {
          return new Date(b.dob) - new Date(a.dob); // Comparación de fechas descendente
        }
        return 0;
      });
      return {
        ...state,
        allDrivers: ordered,
      };
    case FILTER:
      const selectedTeam = action.payload;
      const allDrivers = state.driversCopy; // Mantén una copia de todos los conductores sin filtrar
    
      // Si el equipo seleccionado es "Todos", muestra todos los conductores
      if (selectedTeam === "Todos") {
        return {
          ...state,
          allDrivers: allDrivers,
        };
      }
    
      // Filtra los conductores por el equipo seleccionado
      const filteredDrivers = allDrivers.filter((driver) => {
        if (Array.isArray(driver.teams)) {
          return driver.teams.some((team) => team === selectedTeam);
        } else {
          return driver.teams === selectedTeam;
        }
      });

      return {
        ...state,
        allDrivers: filteredDrivers,
      };
      // const filters = state.allDrivers.slice(); //realizo copia de mi estado
      // const filterByTeam = filters.filter(
      //   (driver) => {S
      //     if(Array.isArray(driver.teams)){
      //       return driver.teams.some((team) => team === action.payload);
      //     } else {
      //       return driver.teams === action.payload
      //     }
      //   }
      // );
      // const filterByTeam = filters.filter((driver) => {
      //   const driverTeams = driver.teams.split(",").map((team) => team.trim());
      //   return driverTeams.includes(action.payload);
      // });
      // return {
      //   ...state,
      //   allDrivers: filterByTeam,
      // };
    default:
      return state;
  }
}

export default rootReducer;
