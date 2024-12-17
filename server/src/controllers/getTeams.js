const { Team } = require("../db");

const getTeams = async (req, res) => {
  try {
      const teamsBD = await Team.findAll()
    
      res
      .status(200)
      .json(teamsBD);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTeams;
