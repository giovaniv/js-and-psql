
const paramName = process.argv.slice(2);

const pg = require("pg");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

function listNames(list) {
  for (let i = 0; i < list.length; i++) {
    let id = list[i].id;
    let name = list[i].first_name + ' ' + list[i].last_name;
    let date = list[i].birthdate;
    console.log('-',id,':',name,', born',date);
  }
}

knex('famous_people')
.where('first_name', 'like', paramName[0])
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  listNames(rows);
  knex.destroy();
});