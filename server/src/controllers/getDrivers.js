const axios = require("axios");
const { Driver } = require("../db")

const getDrivers = async (req, res) => {
    try {
        const url = 'http://localhost:5000/drivers';
        const response = await axios.get(url);
        const datas = response.data.map((driver) => {return {
            id: driver.id,
            forename: driver.name.forename,
            surname: driver.name.surname,
            description: driver.description,
            image: driver.image.url,
            nationality: driver.nationality,
            dob: driver.dob,
        }})
        const arrayDriversApi = datas
        
        const arrayDriversDb = await Driver.findAll();
       
        let allDrivers = [];

        if(arrayDriversApi & arrayDriversDb ) {
            allDrivers = [...arrayDriversApi, ...arrayDriversDb]
        } else if (arrayDriversApi) {
            allDrivers = arrayDriversApi
        } else {
            allDrivers = arrayDriversDb
        }

        res.status(200).json(allDrivers)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = getDrivers