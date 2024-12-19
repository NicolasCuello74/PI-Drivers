const { Driver } = require("../db");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
//Función que se utiliza por única vez para poblar la BD
const getDriver1 = async (req, res) => {    
    try {
        // const url = "http://localhost:5000/drivers";
        //     const response = await axios.get(url);
        //     const arrayDriversApi = response.data
        //     const driversApi = await arrayDriversApi.map((driver) => ({
        //         id: uuidv4(),
        //         forename: driver.name?.forename || "N/A",
        //         surname: driver.name?.surname || "N/A",
        //         description: (driver.description || "No description available").slice(0, 255),
        //         image: driver.image?.url || "https://i.pinimg.com/564x/1e/1f/66/1e1f66a3ce77beea31a833f0008648d3.jpg",
        //         nationality: driver.nationality || "Unknown",
        //         dob: driver.dob || "Unknown",
        //         teams: driver.teams || "No teams listed",
        //         }));
        //         console.log(driversApi);
                
            
            const peopleBD = await Driver.bulkCreate(driversApi);
        res
        .status(200)
        .json(peopleBD);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = getDriver1;