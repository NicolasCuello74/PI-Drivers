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
       forename: driver.forename,
       surname: driver.surname,
       description: driver.description,
       image: driver.image,
       nationality: driver.nationality,
       teams: driver.Teams.map(team => team.name).toString()
    }))
     return cleanDrive;
 }
};

module.exports = driverByNameDb;