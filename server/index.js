const server = require("./src/server");
const { conn } = require('./src/db.js');
const { PORT } = process.env;
const port = PORT

conn.sync({ force: false }).then(() => {
server.listen(port, () => {
  console.log(`Server listening on port`);
})
}).catch(error => console.error(error))
