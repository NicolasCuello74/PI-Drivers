const { Driver } = require("../db")

const getDriversDB = async (id) => {
    const driversDb = await Driver.findByPk(id, {
        include: [
        {
            model: Driver,
            attributes: [
              "id",
              "forename",
              "surname",
              "description",
              "image",
              "nationality",
              "dob",
            ],
            through: { attributes: [] },
        }
        ]
    })
    if(!driversDb) {
        throw Error("Drivers not found")
    } else {
        return driversDb
    } 
}

module.exports = getDriversDB;