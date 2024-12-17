const axios = require("axios");

const driversByNameApi = async (name) => {
  if (name) {
    
   // Utilizamr expresiones regulares para buscar coincidencias
   const regex = new RegExp(name, "i");
   const url = `http://localhost:5000/drivers`;

   const response = await axios.get(url);
   const datas = response.data;

   const filteredDrivers = datas.filter((driver) => {
     const forenameMatch = regex.test(driver.name.forename);
     const surnameMatch = regex.test(driver.name.surname);
     return forenameMatch || surnameMatch;
   });
  
    const arrayFromApi = filteredDrivers.map((driver) => {
      return {
        id: driver.id,
        forename: driver.name.forename || "N/A",
        surname: driver.name.surname || "N/A",
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
