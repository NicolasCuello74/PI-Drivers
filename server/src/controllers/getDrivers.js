const axios = require("axios");
const { Driver, Team } = require("../db");

const getDrivers = async (req, res) => {
  try {
    const url = "http://localhost:3001/api";
    const response = await axios.get(url);
    const arrayDriversApi = response.data
    
    const driversApi = await arrayDriversApi.map((driver) => ({
      id: driver.id,
      forename: driver.name?.forename || "N/A",
      surname: driver.name?.surname || "N/A",
      description: driver.description || "No description available",
      image: driver.image?.url || "https://i.pinimg.com/564x/1e/1f/66/1e1f66a3ce77beea31a833f0008648d3.jpg",
      nationality: driver.nationality || "Unknown",
      dob: driver.dob || "Unknown",
      teams: driver.teams || "No teams listed",
      }));


    const arrayDriversDb = await Driver.findAll(
      {
        include: Team,
      }
      
      );
    const CleanDriversDb = await arrayDriversDb.map((driver)=>  ({
      id: driver.id,
      forename: driver.forename,
      surname: driver.surname,
      description: driver.description,
      image: driver.image,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.Teams.map((team)=>(team.name)).toString(),
    }))

    let allDrivers = [];
    
    if (driversApi.length > 0 && CleanDriversDb.length > 0) {
      allDrivers = [...driversApi, ...CleanDriversDb];
    } else if (driversApi.length > 0) {
      allDrivers = driversApi;
    } else {
      allDrivers = CleanDriversDb;
    }

    const driversWithDefaultImage = allDrivers.map((driver) => ({
      ...driver,
      image: driver.image || "https://i.pinimg.com/564x/1e/1f/66/1e1f66a3ce77beea31a833f0008648d3.jpg",
    }));

    res.status(200).json(driversWithDefaultImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDrivers;
