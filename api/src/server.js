const getApp = require('./app');
const UserRepository = require('./repository/userRepository');
const ClientRepository = require('./repository/clientRepository');
const port = 4000

// Para poder pegar variáveis do arquivo .env
require('dotenv').config();

const connectionParams = {
  url: process.env.DB_URL,
  dbName: process.env.DB_NAME
}

const repositories = {
  user: new UserRepository(connectionParams),
  client: new ClientRepository(connectionParams)
}

const app = getApp(repositories);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});