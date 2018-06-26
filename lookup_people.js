
const paramName = process.argv.slice(2);

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  sql = "SELECT * from famous_people where first_name like $1";

  function listNames(list) {
    for (let i = 0; i < list.length; i++) {
      let id = list[i].id;
      let name = list[i].first_name + ' ' + list[i].last_name;
      let date = list[i].birthdate;
      console.log('-',id,':',name,', born',date);
    }
  }

  client.query(sql, paramName, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    listNames(result.rows);
    client.end();
  });
});