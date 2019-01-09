//Write the node.js code that runs an array of string sql statements and console.logs the results.

const pg = require('pg');

const configs = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'nba_db',
    port: 5432,
    password: 'shubear123',
};

const client = new pg.Client(configs);

var array = [
//All columns for all players from the New York Knicks (NYK)
"SELECT * FROM players WHERE team = 'IND' AND age < 26;",
//All columns for all players from the Indiana Packers (IND) who are under 26 years old
"SELECT * FROM players WHERE team = 'IND' AND age < 26;",
//All columns for all players, ordered from least points scored to most points scored
"SELECT * FROM players ORDER BY points ASC;",
//All columns for all players on the New York Knicks who scored over 1000 points
"SELECT * FROM players WHERE team = 'NYK' AND POINTS > 1000;",
//All columns for all players on the Chicago Bulls (CHI) who scored under 300 points
"SELECT * FROM players WHERE team = 'CHI' AND POINTS < 300;",
//Select team column only for players that scored 2 or less points in a game.
"SELECT team FROM players GROUP BY team HAVING min(points) <2;",
//The average age for all players https://www.w3schools.com/sql/sql_count_avg_sum.asp
"SELECT avg(age) FROM players;"
];

var arrayQ = [
"All columns for all players from the New York Knicks (NYK)",
"All columns for all players from the Indiana Packers (IND) who are under 26 years old",
"All columns for all players, ordered from least points scored to most points scored",
"All columns for all players on the New York Knicks who scored over 1000 points",
"All columns for all players on the Chicago Bulls (CHI) who scored under 300 points",
"Select team column only for players that scored 2 or less points in a game",
"The average age for all players"
];


if (process.argv[2] === undefined) {
    client.connect((err) => {
      if( err ){
        console.log( "error", err.message );
      }
        for (i = 0; i < array.length; i++) {
            let text = array[i];
            let msg = arrayQ[i];
            client.query(text, (err, res) => {
                if (err) {
                    console.log("query error", err.message);
                } else {
                    console.log(msg, res.rows);
                }
              });
        }
    });
}

