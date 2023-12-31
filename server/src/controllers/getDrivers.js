const axios = require("axios");
const { Driver, Team } = require("../db");

const getDrivers = async (req, res) => {
  try {
    const url = "http://localhost:5000/drivers";
    const response = await axios.get(url);
    const arrayDriversApi = response.data.map((driver) => ({
        id: driver.id,
        forename: driver.name.forename,
        surname: driver.name.surname,
        description: driver.description,
        image: driver.image.url,
        nationality: driver.nationality,
        dob: driver.dob,
        teams: driver.teams,
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
    
    if (arrayDriversApi.length > 0 && CleanDriversDb.length > 0) {
      allDrivers = [...arrayDriversApi, ...CleanDriversDb];
    } else if (arrayDriversApi.length > 0) {
      allDrivers = arrayDriversApi;
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
