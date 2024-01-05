import { useState } from "react";
import style from "../searchbar/searchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getByName } from "../../redux/actions/actions";
import Loading from "../loading/loading";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state)=> state.loading);
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(name.length === 0){
        return alert("No se encontraron conductores con el nombre especificado.");
      }
      await dispatch(getByName(name));
    } catch (error) {
      if (error?.response?.status === 404) {
        alert("No se encontraron conductores con el nombre especificado.");
      } else {
        console.error("Error al buscar conductores:", error);
      }
    }
  };
  return loading ? ( <Loading/> 
  ) : (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        className={style.Input}
        type="search"
        onChange={handleChange}
        placeholder="Buscar por nombre"
      />
      <input type="submit" value="Buscar" />
    </form>
  );
}
