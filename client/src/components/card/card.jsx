import Styles from "../card/card.module.css"
import { Link } from "react-router-dom"
function Card({driver}) {

  return (
    <div className={Styles.cardContainer}>
      <Link to={`/detail/${driver.id}`}>
      <img className={Styles.image} src={driver.image} alt={driver.surname} />
      <h2>Name: {driver.forename}</h2>
      <p>Teams: {driver.teams}</p>
      <p>Driver ID: {driver.id}</p>
      </Link>
    </div>
  )
}

export default Card