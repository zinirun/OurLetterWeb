//FOR SERVER
module.exports = {
  connectionLimit: 30,
  host: process.env.DATABASE_HOST,
  user: "root",
  password: "",
  database: "ourletter_db",
  dateStrings: "date",
  charset: "utf8",
  debug: false,
  insecureAuth: true,
};
//
////FOR LOCAL TEST
//module.exports = {
//    connectionLimit: 20,
//    host: 'localhost',
//    user: 'root',
//    password: '',
//    database: 'ourletter_db',
//    dateStrings: 'date',
//    debug: false
//};
