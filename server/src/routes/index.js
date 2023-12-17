const { Router } = require("express");

const {
  getTeams,
  getDrivers,
  getDriversId,
  postDriver,
  getName,
  getName2,
} = require("../controllers/index");

const router = Router();

//Configuracion de ruotes
router.get("/drivers", getDrivers); //Obtiene un arreglo de objetos, donde cada objeto es un driver con su información.
router.get("/drivers/:id", getDriversId); //Esta ruta obtiene el detalle de un driver específico. Es decir que devuelve un objeto con la información pedida en el detalle de un driver.
router.get("/name", getName); //Esta ruta debe obtener los primeros 15 drivers que se encuentren con la palabra recibida por query.
router.post("/drivers", postDriver); //Esta ruta recibirá todos los datos necesarios para crear un driver y relacionarlo con sus teams solicitados.
router.get("/teams", getTeams); //Obtiene un arreglo con todos los teams existentes de la API.

module.exports = router;
