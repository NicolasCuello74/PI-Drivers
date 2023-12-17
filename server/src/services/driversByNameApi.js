const axios = require("axios");

const driversByNameApi = async (name) => {
  if (name) {
    const url = `http://localhost:5000/drivers?name.forename=${name}`;
    const response = await axios.get(url);
    const datas = response.data;
    const arrayFromApi = datas.map((driver) => {
      return {
        id: driver.id,
        forename: driver.name.forename,
        surname: driver.name.surname,
        image: driver.image.url,
        description: driver.description,
        teams: driver.teams,
      };
    });
    const driversWithDefaultImage = arrayFromApi.map((driver) => ({
      ...driver,
      image: driver.image || "F1.svg", // Ruta de imagen por defecto
    }));

    return driversWithDefaultImage;
  }
};

module.exports = driversByNameApi;
