
const pg = require("pg");
const settings = require("./settings"); // settings.json
const params = process.argv.slice(2);
const table = "famous_people";
let firstName;
let lastName;
let dob;

// params treatment
firstName = params[0];
lastName = params[1];
dob = params[2];
if (!firstName || !lastName || !dob) {
  console.log('First Name, Last Name and Date of Birth should be passed in this order');
} else {

  // knex connection
  let knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  });

  // new people that we will insert
  let newPerson = {
    first_name: firstName,
    last_name: lastName,
    birthdate: dob
  };

  // function to list all users
  function listNames(list) {
    for (let i = 0; i < list.length; i++) {
      let id = list[i].id;
      let name = list[i].first_name + ' ' + list[i].last_name;
      let date = list[i].birthdate;
      console.log('-',id,':',name,', born',date);
    }
  }

  // we insert the new record and after insert we list all users
  knex(table)
  .insert(newPerson)
  .asCallback(function(err) {
    if (err) return console.error(err);
    console.log('New record inserted...\nListing all famous people...\n');
    knex(table)
    .asCallback(function(err, rows) {
      if (err) return console.error(err);
      listNames(rows);
      knex.destroy();
    });
  });

}
