import config from '../config';
import { logger } from '../utils/logger';
import { Sequelize, Options } from 'sequelize';

let sequelize:any;

if (process.env.NODE_ENV === "development") {
  const { host, name, username, password, port } = config.get('postgreSqlDatabase');
  
  const databaseOptions: Options = {
    host,
    port: port,
    dialect: 'postgres',
    define: {
      timestamps: true,
      freezeTableName: true
    },
    logQueryParameters: true,
    logging: (str: string) => {
      return config.get('postgreSqlDatabase') ? logger.info(`[DATABASE QUERY ${new Date()}] => ${str}`) : null;
    }
  };

  sequelize = new Sequelize(name, username, password, databaseOptions);

} else {
  const { host, name, username, password, port } = config.get('mysqlDatabase');

  const databaseOptions: Options = {
    host,
    port: port,
    dialect: 'mysql',
    define: {
      timestamps: true,
      freezeTableName: true
    },
    logQueryParameters: true,
    logging: (str: string) => {
      return config.get('mysqlDatabase.showLogs') ? logger.info(`[DATABASE QUERY ${new Date()}] => ${str}`) : null;
    }
  };
  
  sequelize = new Sequelize(name, username, password, databaseOptions);
}

export { sequelize };
