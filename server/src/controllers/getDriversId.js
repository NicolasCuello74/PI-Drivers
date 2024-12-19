const axios = require("axios");
const getDriversDB = require("../services/driversByIdBd");

const getDriversId = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      // Buscar en la base de datos si el ID no es un número
      const response = await getDriversDB(id);
      const data = response;

      // Procesar datos obtenidos de la base de datos
      const cleanedData = {
        id: data.id,
        forename: data.forename,
        surname: data.surname,
        description: data.description,
        image: data.image,
        nationality: data.nationality,
        dob: data.dob,
        teams: data.Teams.map((team) => team.name).toString(),
      };

      res.status(200).json(cleanedData);
    } else {
      // Buscar en la API externa si el ID es un número
      const url = "http://localhost:3001/api";
      const response = await axios.get(url);

      // Procesar los datos obtenidos de la API
      const drivers = response.data;

      // Buscar el conductor específico por ID en los datos de la API
      const driver = drivers.find((d) => d.id === parseInt(id));

      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }

      // Limpiar los datos del conductor encontrado
      const cleanedData = {
        id: driver.id,
        forename: driver.name?.forename || "N/A",
        surname: driver.name?.surname || "N/A",
        description: driver.description,
        image:
          driver.image.url ||
          "https://i.pinimg.com/564x/1e/1f/66/1e1f66a3ce77beea31a833f0008648d3.jpg",
        nationality: driver.nationality || "Unknown",
        dob: driver.dob || "Unknown",
        teams: driver.teams || "No teams listed",
      };

      res.status(200).json(cleanedData);
    }
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDriversId;

