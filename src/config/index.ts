import convict from 'convict';

const config = convict({
  env: {
    default: 'development',
    env: 'NODE_ENV',
    doc: 'The application environment',
    format: ['production', 'development', 'staging', 'test']
  },
  port: {
    arg: 'port',
    default: 4000,
    doc: 'The port to bind',
    env: 'APP_PORT',
    format: 'port'
  },
  baseUrl: {
    default: 'http://localhost:8000/',
    doc: 'App base url',
    env: 'BASE_URL',
    nullable: true,
    format: String
  },
  showLogs: {
    arg: 'show-app-logs',
    default: true,
    doc: 'To determine whether to show application logs',
    env: 'SHOW_APP_LOGS',
    format: Boolean,
    nullable: true
  },
  sendEmails: {
    arg: 'send-app-emails',
    default: true,
    doc: 'To determine whether to send application emails',
    env: 'SEND_APP_EMAILS',
    sender:'EMAIL_SENDER',
    format: Boolean,
    nullable: true
  },
  mysqlDatabase: {
    host: {
      default: 'localhost',
      doc: 'Mysql database host name/IP',
      env: 'MYSQL_DATABASE_HOST',
      format: '*'
    },
    port: {
      default: 3306,
      doc: 'Mysql database server port',
      env: 'MYSQL_DATABASE_PORT',
      format: 'port'
    },
    name: {
      default: 'geolandmark',
      doc: 'Mysql database name',
      env: 'MYSQL_DATABASE_NAME',
      nullable: false,
      format: String
    },
    username: {
      default: 'root',
      doc: 'Mysql database username',
      env: 'MYSQL_DATABASE_USERNAME',
      nullable: false,
      format: String
    },
    password: {
      doc: 'Mysql database password',
      env: 'MYSQL_DATABASE_PASSWORD',
      format: String,
      nullable: true,
      default: '',
      sensitive: true
    },
    showLogs: {
      default: true,
      doc: 'To determine whether to show mysql database logs',
      env: 'MYSQL_DATABASE_SHOW_LOGS',
      format: Boolean
    },
    dialect: {
      default: "mysql",
    }
  },
  postgreSqlDatabase: {
    host: {
      default: 'localhost',
      doc: 'Postgres database host name/IP',
      env: 'POSTGRES_DATABASE_HOST',
      format: '*'
    },
    port: {
      default: 5432,
      doc: 'Postgres database server port',
      env: 'POSTGRES_DATABASE_PORT',
      format: 'port'
    },
    name: {
      default: 'Records',
      doc: 'Postgres database name',
      env: 'POSTGRES_DATABASE_NAME',
      nullable: false,
      format: String
    },
    username: {
      default: 'postgres',
      doc: 'Postgres database username',
      env: 'POSTGRES_DATABASE_USERNAME',
      nullable: false,
      format: String
    },
    password: {
      doc: 'Postgres database password',
      env: 'POSTGRES_DATABASE_PASSWORD',
      format: String,
      nullable: true,
      default: '',
      sensitive: true
    },
    showLogs: {
      default: true,
      doc: 'To determine whether to show Postgres database logs',
      env: 'POSTGRES_DATABASE_SHOW_LOGS',
      format: Boolean
    }
  },
  redis: {
    host: {
      default: '127.0.0.1',
      doc: 'Redis database host name/IP',
      env: 'REDIS_HOST',
      format: '*'
    },
    port: {
      default: '6379',
      doc: 'Redis database port',
      env: 'REDIS_PORT',
      format: 'port'
    },
    password: {
      doc: 'Redis database password',
      env: 'REDIS_PASSWORD',
      format: String,
      nullable: true,
      default: '',
      sensitive: true
    },
    username: {
      default: '',
      doc: 'Redis database username',
      env: 'REDIS_USERNAME',
      nullable: false,
      format: String
    }
  },
  slack: {
    webhookUrl: {
      default: '',
      doc: 'Slack webhook url',
      env: 'SLACK_WEBHOOK_URL',
      nullable: true,
      format: String
    },
    channelUrl: {
      demoRequest: {
        default: '',
        doc: 'Incoming webhook notification url for demo requests slack channel',
        env: 'SLACK_CHANNEL_URL_DEMO_REQUEST',
        nullable: false,
        format: String
      },
      supportMessage: {
        default: '',
        doc: 'Incoming webhook notification url for support message slack channel',
        env: 'SLACK_CHANNEL_URL_SUPPORT_MESSAGE',
        nullable: false,
        format: String
      },
      stagingAlerts: {
        default: 'https://hooks.slack.com/services/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',
        doc: 'Non production email verification link',
        env: 'SLACK_CHANNEL_URL_EMAIL_VERIFICATION',
        nullable: true,
        format: String
      }
    }
  },
  supportMessage: {
    timeLimit: {
      default: 600000,
      doc: 'Support message time limit in milliseconds',
      env: 'SUPPORT_MESSAGE_TIME_LIMIT_IN_MILLISECONDS',
      nullable: false,
      format: Number
    }
  },
  app: {
    baseUrl: {
      default: 'http://localhost:8000/',
      doc: 'App base url',
      env: 'APP_BASE_URL',
      nullable: true,
      format: String
    },
    emailVerificationUrl: {
      default: 'http://localhost:3000/verify-account',
      doc: 'App email verification link',
      env: 'APP_EMAIL_VERIFICATION_URL',
      nullable: true,
      format: String
    },
    passwordResetUrl: {
      default: 'https://user-dashboard-client.vercel.app/reset-password',
      doc: 'App password reset link',
      env: 'APP_PASSWORD_RESET_URL',
      nullable: true,
      format: String
    }
  },
  jwt: {
    expiry: {
      default: 7200,
      doc: 'JWT expiry in seconds',
      env: 'JWT_EXPIRY_IN_SECONDS',
      nullable: true,
      format: Number
    }
  },
  sendinblue: {
    apiKey: {
      default: '',
      doc: 'Sendinblue API key',
      env: 'SENDINBLUE_API_KEY',
      nullable: true,
      format: String
    }
  },
  sendgrid: {
    apiKey: {
      default: '',
      doc: 'Sendgrid API key',
      env: 'SENDGRID_API_KEY',
      nullable: true,
      format: String
    },
    templateIds: {
      verifyEmail: {
        default: '',
        doc: 'Sendgrid email verification template id',
        env: 'SENDGRID_APP_VERIFY_EMAIL_TEMPLATE_ID',
        nullable: true,
        format: String
      },
      passwordReset: {
        default: '',
        doc: 'Sendgrid password reset template id',
        env: 'SENDGRID_APP_PASSWORD_RESET_TEMPLATE_ID',
        nullable: true,
        format: String
      }
    }
  },
  email: {
    sender: {
      default: 'GeolandMark@gmail.cm',
      doc: 'Default app email sender',
      env: 'EMAIL_SENDER',
      nullable: true,
      format: String
    }
   
  },
  github: {
    authorizationToken: {
      default: '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',
      doc: 'Github authorization token',
      env: 'GITHUB_AUTHORIZATION_TOKEN',
      nullable: true,
      format: String
    }
  },
  encryption: {
    apiKeyEnv: {
      default: 'live',
      doc: 'Environment where the api key is being generated',
      env: 'API_KEY_ENV',
      nullable: false,
      format: ['live', 'test']
    },
    apiKeyEncryptionKey: {
      default: '',
      doc: '32 characters encryption key used to encrypt API keys',
      env: 'API_KEY_ENCRYPTION_KEY',
      nullable: false,
      format: String
    }
  }
});

// Perform validation
config.validate({ allowed: 'strict' });

export default config;
