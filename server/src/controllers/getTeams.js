const { Team } = require("../db");
const axios = require("axios");
const getTeams = async (req, res) => {
  try {
      //*Función para plantar BD*//
      // const url = "http://localhost:3001/api";
      //   const response = await axios.get(url);
      //   const arrayDriversApi = response.data

      //   const teams = [...new Set(
      //     arrayDriversApi
      //       .map(driver => driver.teams)
      //       .join(',')                   
      //       .split(',')                  
      //       .map(team => team.trim())
      //   )];

      //   const teamPromises = teams.map(team => 
      //     Team.create({ name: team })
      //   );

      //   await Promise.all(teamPromises);
      //   console.log("Equipos plantados exitosamente en la base de datos.");

      const teamsBD = await Team.findAll()
    
      res
      .status(200)
      .json(teamsBD);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTeams;
