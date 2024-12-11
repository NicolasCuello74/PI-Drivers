const server = require("./src/server");
const { conn } = require('./src/db.js');
const {POSTGRES_HOST} = process.env;

conn.sync({ force: false }).then(() => {
server.listen(POSTGRES_HOST, () => {
  console.log(`Server listening on port`);
})
}).catch(error => console.error(error))
