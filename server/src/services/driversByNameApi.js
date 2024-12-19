const axios = require("axios");

const driversByNameApi = async (name) => {
  if (!name) {
    throw new Error("Name is required to perform the search.");
  }

  try {
    // Crear expresión regular basada en el valor de entrada
    const regex = new RegExp(name, "i");
    const url = `http://localhost:3001/api`;

    // Obtener datos desde la API
    const response = await axios.get(url);
    const datas = response.data;

    // Filtrar conductores por nombre o apellido que coincidan con el regex
    const filteredDrivers = datas.filter((driver) => {
      const forenameMatch = driver.name?.forename && regex.test(driver.name.forename);
      const surnameMatch = driver.name?.surname && regex.test(driver.name.surname);
      return forenameMatch || surnameMatch;
    });
    
    // Formatear datos para la salida
    const arrayFromApi = filteredDrivers.map((driver) => ({
      id: driver.id,
      forename: driver.name?.forename || "N/A",
      surname: driver.name?.surname || "N/A",
      description: driver.description || "No description available",
      image:
        driver.image?.url ||
        "https://i.pinimg.com/564x/1e/1f/66/1e1f66a3ce77beea31a833f0008648d3.jpg",
      nationality: driver.nationality || "Unknown",
      dob: driver.dob || "Unknown",
      teams: driver.teams || "No teams listed",
    }));
    
    return arrayFromApi;
  } catch (error) {
    console.error("Error fetching drivers by name:", error.message);
    throw new Error("Failed to fetch drivers by name.");
  }
};

module.exports = driversByNameApi;
