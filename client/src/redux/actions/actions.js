import axios from "axios";
export const GET_DRIVERS = "GET_DRIVERS";
export const GET_TEAMS = "GET_TEAMS";
export const GET_BY_NAME = "GET_BY_NAME";
export const FILTER = "FILTER";
export const ORDER = "ORDER";
export const DETAIL = "GET_DETAIL";
export const LOADING = "LOADING";
export const POST_DRIVER = "POST_DRIVER";
const URL = "http://localhost:3001";

export function getDrivers() {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/drivers`);
    return dispatch({
      type: "GET_DRIVERS",
      payload: response.data,
    });
  };
}

export function getByName(name) {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/name?name=${name}`);
    return dispatch({
      type: "GET_BY_NAME",
      payload: response.data,
    });
  };
}

export function postDriver(payload) {
  return async function (dispatch) {
    const { data } = await axios.post(`${URL}/drivers`, payload)
    return dispatch({
      type: "POST_DRIVER",
      payload: data
    })
  }
}

export function getDriverId(id) {
 return async function (dispatch) {
    const response = await axios.get(`${URL}/detail/${id}`);
    return dispatch({
      type: "GET_DETAIL",
      payload: response.data,
    });
 };
}

export function getTeams() {
  return async function (dispatch) {
    const response = await axios.get(`${URL}/teams`);
    return dispatch({
      type: "GET_TEAMS",
      payload: response.data
    })
  }  
}

export const filterCard = (teams) =>{   
  return {
      type: "FILTER",
      payload: teams,
  }
}

export const orderCard = (orden) =>{   
  return {
      type: "ORDER",
      payload: orden,
  }
}

export const loading = () => {
  return {
    type: "LOADING",
    payload: true
  }
}
