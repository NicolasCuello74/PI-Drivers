const axios = require("axios");
const { Driver, Team } = require("../db");

const getDrivers = async (req, res) => {
  try {
    const url = "http://localhost:5000/drivers";
    const response = await axios.get(url);
    const datas = response.data.map((driver) => {
      return {
        id: driver.id,
        forename: driver.name.forename,
        surname: driver.name.surname,
        description: driver.description,
        image: driver.image.url,
        nationality: driver.nationality,
        dob: driver.dob,
        teams: driver.teams,
      };
    });
    const arrayDriversApi = datas;

    const arrayDriversDb = await Driver.findAll(
      {
        include: Team,
      });

    let allDrivers = [];

    if (arrayDriversApi & arrayDriversDb) {
      allDrivers = [...arrayDriversApi, ...arrayDriversDb];
    } else if (arrayDriversApi) {
      allDrivers = arrayDriversApi;
    } else {
      allDrivers = arrayDriversDb;
    }

    const driversWithDefaultImage = allDrivers.map((driver) => ({
      ...driver,
      image: driver.image || "F1.svg", // Ruta de imagen por defecto
    }));

    res.status(200).json(driversWithDefaultImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDrivers;
