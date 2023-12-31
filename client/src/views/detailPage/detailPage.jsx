import styles from "../detailPage/detailPage.module.css";
import axios from "axios";
import Loading from "../../components/loading/loading"
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function DetailPage() {
  const { id } = useParams();

  const [driver, setDriver] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios(`http://localhost:3001/drivers/${id}`).then(
      ({ data }) => {
        if (data.id) {
          setDriver(data);
          setLoading(false);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      }
    );
    return setDriver({});
    }, [id]);

  return loading ? ( <Loading/> 
  ) : (
    <>
    <div className={styles.detailContainer}>
    <button className={styles.enterButton} onClick={()=>{navigate("/home")}}>
     Volver a home
    </button>
    <img className={styles.img} src={driver.image} alt={driver.name} />
    <h2 className={styles.h2}>{driver.forename}</h2>
    <h2 className={styles.h2}>{driver.surname}</h2>
    <p className={styles.statusSpecies}>ID: {driver.id}</p>
      <p className={styles.statusSpecies}>Nationality: {driver.nationality}</p>
      <p className={styles.statusSpecies}>DOB: {driver.dob}</p>
      <p className={styles.statusSpecies}>Description: {driver.description}</p>
      <p className={styles.statusSpecies}>Teams: {driver.teams}</p>
    </div>
    </>
  )
  }

  export default DetailPage