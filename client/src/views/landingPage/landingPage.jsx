import styles from "../landingPage/landingPage.module.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate()

  const handleButton = (e) => {
    e.preventDefault()
    navigate("/home")
  }

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>BIENVENIDOS A DRIVERS</h1>
     <div>
     <button className={styles.enterButton} onClick={handleButton}>
      Iniciar
    </button>
     </div>
  </div>
  )
}

export default LandingPage