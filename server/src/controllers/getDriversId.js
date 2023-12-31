const axios = require("axios");
const getDriversDB = require("../services/driversByIdBd");

const getDriversId = async (req, res) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      const response = await getDriversDB(id);
      const data = response;
      const cleanedData = {
        id: data.id,
        forename: data.forename,
        surname: data.surname,
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
        image: image.url || "https://i.pinimg.com/564x/1e/1f/66/1e1f66a3ce77beea31a833f0008648d3.jpg",
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
