const { driversByNameApi, driversByNameDb } = require("../services/index");

const getName = async (req, res) => {
  
  try {
    const {name} = req.query;

    const driversFromApi = await driversByNameApi(name);
    const driversFromDb = await driversByNameDb(name);

    let allDrivers = [];
    if (driversFromApi && driversFromDb) {
      allDrivers = [...driversFromApi, ...driversFromDb];
    } else if (driversFromApi) {
      allDrivers = driversFromApi;
    } else {
      allDrivers = driversFromDb;
    }
    

    const finalResults = allDrivers.slice(0, 15);
    if(finalResults.length > 0){
      res.status(200).json(finalResults);
    } else {
      res.status(404).json({ message: `No se encontraron conductores con el nombre '${name}'` });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getName;
