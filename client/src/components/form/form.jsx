import { useEffect, useState } from "react";
import validate from "./validation";
import Styles from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTeams, postDriver } from "../../redux/actions/actions";

function Forms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teams = useSelector((state) => state.allTeams);
  
  const [input, setInput] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "teams") {
      const selectedTeams = Array.from(e.target.selectedOptions, (option) => option.value);
  
      setInput({
        ...input,
        [name]: selectedTeams,
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  
    setErrors(
      validate({
        ...errors,
        [name]: value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    //Asegúrate de que el campo teams sea un array, no una cadena
    const payload = {
      ...input,
      teams: Array.isArray(input.teams) ? input.teams : [input.teams],
    };
  
    try {
      // Realiza la solicitud al servidor con el formato correcto
      await dispatch(postDriver(payload));
  
      // Restablece el estado del formulario después de enviar
      setInput({
        forename: "",
        surname: "",
        description: "",
        image: "",
        nationality: "",
        dob: "",
        teams: [],
      });
  
      // Muestra algún tipo de confirmación al usuario
      alert("Driver creado exitosamente");
  
      // Redirige o realiza otras acciones según tu aplicación
      navigate("/home");
    } catch (error) {
      // Maneja los errores de manera apropiada, muestra mensajes de error al usuario si es necesario
      console.error("Error al crear el conductor:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={Styles.form}>
        <div className={Styles.caja}>
          <div>
            <label className={Styles.label}> Forename:</label>
            <input
              className={Styles.input}
              name="forename"
              value={input.value}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={Styles.label}> Surname:</label>
            <input
              className={Styles.input}
              name="surname"
              value={input.value}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={Styles.label}> Description:</label>
            <input
              className={Styles.input}
              name="description"
              value={input.value}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={Styles.label}> Image: URL</label>
            <input
              className={Styles.input}
              name="image"
              value={input.value}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={Styles.label}> Nationality</label>
            <input
              className={Styles.input}
              name="nationality"
              value={input.value}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={Styles.label}> DOB:</label>
            <input
              className={Styles.input}
              name="dob"
              value={input.value}
              onChange={handleChange}
            />
            <p className={Styles.errorMessage}>{errors.dob}</p>
          </div>
          <div>
            <label className={Styles.label}> Teams:</label>
            <select
              className={Styles.input}
              name="teams"
              value={input.teams}
              onChange={handleChange}
              multiple
            >
              {teams.map((team) => (
                <option key={team.id} value={team.id} selected={input.teams.includes(team)}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        </div>
          <button type="submit" className={Styles.button}>
            Enviar
          </button>
      </form>
    </>
  );
}

export default Forms;
