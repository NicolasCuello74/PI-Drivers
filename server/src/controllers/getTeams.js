const { Team } = require("../db");
const axios = require("axios");

const getTeams = async (req, res) => {
  try {
    // Obtener datos de la base de datos del servidor
    const url = "http://localhost:5000/drivers";
    const response = await axios.get(url);
    const equiposServidor = response.data;
    const nombresEquipos = equiposServidor
      .map((equipo) => equipo.teams)
      .join(",") // Unir todos los strings en uno solo separado por comas
      .split(",") // Separar el string en un arreglo usando las comas como delimitadores
      .map((nombre) => nombre.trim()) // Eliminar espacios en blanco alrededor de cada nombre
      .filter((nombre, index, array) => array.indexOf(nombre) === index)
      .filter((nombre)=> nombre !== ""); // Eliminar duplicados

      for (let i = 0; i < nombresEquipos.length; i++) {
        await Team.findOrCreate({
          where: { name: nombresEquipos[i] }
        });
      }

      const teamsBD = await Team.findAll()
    
      res
      .status(200)
      .json(teamsBD);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTeams;
