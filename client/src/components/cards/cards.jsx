import Styles from "../cards/cards.module.css";
import Card from "../card/card";

function Cards({ allDrivers }) {

  return (
    <div className={Styles.cardsList}>
      {allDrivers.map((driver) => (
        <Card key={driver.id} driver={driver} />
      ))}
    </div>
  );
}

export default Cards;
