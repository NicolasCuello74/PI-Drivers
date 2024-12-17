const { Driver, Team } = require("../db")
const { Op } = require("sequelize")

const driverByNameDb = async (name) => {
 if (name){
    const driveDb = await Driver.findAll({
        where: {
            [Op.or]: [
                { forename: { [Op.iLike]: `%${name}%` } },
                { surname: { [Op.iLike]: `%${name}%` }},
            ],
        },
        include: Team,
        limit: 15,
    })
    const cleanDrive = driveDb.map((driver) => ({
       id: driver.id,
       forename: driver.forename || "N/A",
       surname: driver.surname || "N/A",
       description: driver.description,
       image: driver.image || "https://i.pinimg.com/564x/1e/1f/66/1e1f66a3ce77beea31a833f0008648d3.jpg",
       nationality: driver.nationality,
       teams: driver.Teams.map(team => team.name).toString()
    }))
     return cleanDrive;
 }
};

module.exports = driverByNameDb;