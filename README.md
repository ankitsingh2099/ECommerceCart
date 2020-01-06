# ECommerceCart

####Enter database related details in the following file
```
config/config.json
```

####Create Database
```
node executables/createECommerceCartDatabse.js
```

####Create Tables
```
node_modules/.bin/sequelize db:migrate
```

####Add sample products
```
node executables/seedProductsTable.js
```

####Source environment variable
```
source set_env_var.sh
```

####Start the server
```
node ./bin/www
```

####Test APIs with postman
Postman collection is available at /test/postman/ folder

#### Test services by running following command
```
mocha --timeout 120000 test/* --exit
```
