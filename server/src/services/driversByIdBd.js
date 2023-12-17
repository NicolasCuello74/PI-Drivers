const { Driver, Team } = require("../db")

const getDriversDB = async (id) => {
    const driversDb = await Driver.findByPk(id,{
        include: Team,
    })
    if(!driversDb) {;
        throw Error("Drivers not found")
    } else {
        return driversDb
    } 
}

module.exports = getDriversDB;