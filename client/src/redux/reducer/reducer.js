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
  allTeams: [],
  posts: [],
  detail: [],
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
      const ordered = state.allDrivers.slice(); // Clonación del array
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
      const copi = state.driversCopy; // Copia de todos los conductores sin filtrar
      // Filtro de los conductores por el equipo seleccionado
      const filteredDrivers = copi.filter((driver) => {
        if (driver.teams) {
          return driver.teams.includes(selectedTeam);
        }
      });
      return {
        ...state,
        allDrivers: filteredDrivers,
      };
    default:
      return state;
  }
}

export default rootReducer;
