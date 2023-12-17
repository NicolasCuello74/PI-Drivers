const { Driver, Team } = require("../db")
const { Op } = require("sequelize")
const axios = require("axios");

const getName2 = async (req, res) => {
    try {
      const search_term = req.query.name || '';
  
      // Validar si el término de búsqueda es un UUID antes de realizar la consulta
      const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(search_term);
  
      let dbResults;
  
      if (isUUID) {
        // Buscar por UUID
        dbResults = await Driver.findAll({
          where: {
            forename: search_term,
          },
          include: Team,
          limit: 15,
        });
      } else {
        // Buscar por nombre
        dbResults = await Driver.findAll({
          where: {
            forename: {
              [Op.iLike]: `%${search_term}%`,
            },
          },
          include: Team,
          limit: 15,
        });
      }
      
    const apiResponse = await axios.get(`http://localhost:5000/drivers?name.forename=${search_term}`);
    const apiResults = apiResponse.data || [];


      // Combinar resultados de la base de datos local y la API
    const allResults = [...dbResults, ...apiResults];

    // Tomar los primeros 15 resultados
    const finalResults = allResults.slice(0, 15);

    // Verificar si se encontraron resultados
    if (finalResults.length > 0) {
      res.json(finalResults);
    } else {
      res.status(404).json({ message: `No se encontraron conductores con el nombre '${search_term}'` });
    }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  module.exports = getName2