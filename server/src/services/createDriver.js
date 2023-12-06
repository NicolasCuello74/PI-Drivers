const { Driver } = require("../db");

const createDriver = async({
  forename,
  surname,
  description,
  image,
  nationality,
  dob,
  teams,
}) => {
  const newDriver = await Driver.create({
    forename,
    surname,
    description,
    image,
    nationality,
    dob,
  });

  newDriver.addTeams(teams);

  return newDriver;
};

module.exports = createDriver;
