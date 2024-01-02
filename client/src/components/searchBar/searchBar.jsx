import { useState } from "react";
import style from "../searchbar/searchBar.module.css";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/actions";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(name))
  }

  return (
      <form className={style.form}onSubmit={handleSubmit}>
        <input className={style.Input} type="search" onChange={handleChange} placeholder="Buscar por nombre" />
        <input type="submit" value="Buscar"/>
      </form>
  );
}
