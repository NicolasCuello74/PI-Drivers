const axios = require("axios");
const getDriversDB = require("../services/driversByIdBd");

const getDriversId = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      const response = await getDriversDB(id);
      const data = response;
      const cleanedData = {
        name: data.forename,
        description: data.description,
        image: data.image,
        nationality: data.nationality,
        dob: data.dob,
        teams: data.Teams.map(team => team.name).toString(),
      };
      res.status(200).json(cleanedData);
    } else {
      const url = `http://localhost:5000/drivers/${id}`;
      const response = await axios.get(url);
      const datas = response.data;
      const {

        name: name,
        description: description,
        image: image,
        nationality: nationality,
        dob: dob,
        teams: teams,
      } = datas;
      const driversFromServer = {
        id: id,
        forename: name.forename,
        surname: name.surname,
        description,
        image: image.url,
        nationality,
        dob,
        teams: teams,
      };
      res.status(200).json(driversFromServer);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDriversId;
