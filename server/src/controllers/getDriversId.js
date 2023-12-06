const axios = require("axios");
const  getDriversDB = require("../services/driversBd");

const getDriversId = async (req, res) => {

    const { id } = req.params;
      try {
        if(isNaN(id)) {
            const driversFromDb = await getDriversDB(id);
            res.status(200).json(driversFromDb)
        } else {
            const url = `http://localhost:5000/drivers/${id}`
            const response = await axios.get(url)
            const driversFromServer = response.data
            res.status(200).json(driversFromServer);
        }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDriversId;
