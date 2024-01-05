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

  const [errors, setErrors] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    dob: "",
  });

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "teams") {
      const selectedTeams = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
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
    const fieldErrors = validate({ ...input, [name]: value });
    setErrors({
      ...errors,
      [name]: fieldErrors[name],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(input);
    if (
      Object.keys(validationErrors).some((key) => validationErrors[key] !== "")
    ) {
      setErrors(validationErrors);
      return;
    }
    const payload = {
      ...input,
      teams: Array.isArray(input.teams) ? input.teams : [input.teams],
    };
    try {
      await dispatch(postDriver(payload));

      // Restablecer el estado del formulario
      setInput({
        forename: "",
        surname: "",
        description: "",
        image: "",
        nationality: "",
        dob: "",
        teams: [],
      });

      alert("Driver creado exitosamente"); //Si el usuario fue creado correctamente
      navigate("/home"); 
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;
        alert(serverErrors);
      } else {
        alert("Error al crear el conductor:", error);
      }
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
            {errors.forename && <p className={Styles.errorMessage}>{errors.forename}</p>}
          </div>
          <div>
            <label className={Styles.label}> Surname:</label>
            <input
              className={Styles.input}
              name="surname"
              value={input.value}
              onChange={handleChange}
            />
            <p className={Styles.errorMessage}>{errors.surname}</p>
          </div>
          <div>
            <label className={Styles.label}> Description:</label>
            <input
              className={Styles.input}
              name="description"
              value={input.value}
              onChange={handleChange}
            />
            <p className={Styles.errorMessage}>{errors.description}</p>
          </div>
          <div>
            <label className={Styles.label}> Image: URL</label>
            <input
              className={Styles.input}
              name="image"
              value={input.value}
              onChange={handleChange}
            />
            <p className={Styles.errorMessage}>{errors.image}</p>
          </div>
          <div>
            <label className={Styles.label}> Nationality</label>
            <input
              className={Styles.input}
              name="nationality"
              value={input.value}
              onChange={handleChange}
            />
            <p className={Styles.errorMessage}>{errors.nationality}</p>
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
            <label className={Styles.label}>
             
              Teams: Mantener ctrl para seleccionar más de 1 team
            </label>
            <select
              className={Styles.input}
              name="teams"
              value={input.teams}
              onChange={handleChange}
              multiple
            >
              {teams.map((team) => (
                <option
                  key={team.id}
                  value={team.id}
                  selected={input.teams.includes(team)}
                >
                  {team.name}
                </option>
              ))}
            </select>
            <p className={Styles.errorMessage}>{errors.teams}</p>
          </div>
        </div>
        {Object.values(errors).some((error) => error !== "") ? (
          <span className={Styles.SPAN}>
            Corrige los errores antes de enviar.
          </span>
        ) : (
          <button type="submit" className={Styles.button}>
            Send
          </button>
        )}
      </form>
    </>
  );
}

export default Forms;
