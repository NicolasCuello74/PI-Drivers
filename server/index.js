const server = require("./src/server");
const { conn } = require('./src/db.js');

conn.sync({ force: false }).then(() => {
server.listen(3001, () => {
  console.log(`Server listening on port`);
})
}).catch(error => console.error(error))
