const rootPrefix = "..",
  mysqlConfig = require(rootPrefix + '/config/config'),
  coreConstants = require(rootPrefix + '/coreConstants');

const Sequelize = require('sequelize');

let dbUser = mysqlConfig[coreConstants.environment].username,
  dbPassword = mysqlConfig[coreConstants.environment].password,
  dialect = mysqlConfig[coreConstants.environment].dialect,
  dbName = mysqlConfig[coreConstants.environment].database;


const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: dialect
});

let query = `INSERT INTO \`products\` (\`id\`, \`product_name\`, \`price\`)
VALUES
\t(1, 'A', 30.00),
\t(2, 'B', 20.00),
\t(3, 'C', 50.00),
\t(4, 'D', 15.00);
`;
return sequelize.query(query).then(data => {
  // code to run after successful creation.
  console.log('Sample entries in products table created successfully !!');
  process.exit(0);
});
