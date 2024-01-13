import Styles from "../card/card.module.css"
import { NavLink } from "react-router-dom"
function Card({driver}) {

  return (
    <div className={Styles.cardContainer}>
      <NavLink to={`/detail/${driver.id}`}>
      <img className={Styles.image} src={driver.image} alt={driver.surname} />
      <h2 className={Styles.hdos}>{driver.forename}</h2>
      <h2 className={Styles.hdos}>{driver.surname}</h2>
      </NavLink>
    </div>
  )
}

export default Card