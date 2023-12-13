const { config } = require("dotenv");
config();

const PORT = process.env.PORT || 3307;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "1234567";
const DB_DATABASE = process.env.DB_DATABASE || "casadepaz";
const DB_PORT = process.env.DB_PORT || 3306;

const EMAIL_USER = process.env.EMAIL_USER || "inf@intel.com";
const KINGHOST_SMTP_HOST = process.env.KINGHOST_SMTP_HOST || "**";
const KINGHOST_SMTP_PORT = process.env.KINGHOST_SMTP_PORT || "**";
const KINGHOST_SMTP_USER= process.env.KINGHOST_SMTP_USER || "**";
const KINGHOST_SMTP_PASSWORD= process.env.KINGHOST_SMTP_PASSWORD || "**";
module.exports = {
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    DB_PORT,
    EMAIL_USER,
    KINGHOST_SMTP_HOST,
    KINGHOST_SMTP_PORT,
    KINGHOST_SMTP_USER,
    KINGHOST_SMTP_PASSWORD
  };