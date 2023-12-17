const createDriver = require("../services/createDriver");

const postDriver = async (req, res) => {
  try {
    const { forename, surname, description, image, nationality, dob, teams } =
      req.body;

    if (
      !forename ||
      !surname ||
      !description ||
      !image ||
      !nationality ||
      !dob ||
      !teams
    ) {
      throw Error("Missing some data");
    } else {
      const newDriver = await createDriver({
        forename,
        surname,
        description,
        image,
        nationality,
        dob,
        teams,
      });
      res.status(201).json(newDriver);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postDriver;
