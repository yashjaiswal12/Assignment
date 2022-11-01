const mysql = require("mysql");

const con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"studentdb"
});

con.connect((err)=>{
	if(err) throw err;
	console.log("Connection Created!!");
});

module.exports.con = con;