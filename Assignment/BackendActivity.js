var mysql = require("mysql");
var express = require("express");

var fun = express();

fun.use(express.static('public'));
fun.get('/RegistrationActivity.html', function (req, res) {
   res.sendFile( __dirname + "/" + "RegistrationActivity.html" );
})

fun.get("/process_get",function(req,res){
	var un = req.query.unamereg;
	var pd = req.query.pswdreg;
	var cpswd = req.query.cnfpswd;
	
	//if(pd==cpswd){
		var con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "",
			database: "studentdb"
		});

		con.connect(function(err) {
			if (err) throw err;
			console.log("Connected..!!");
			var sql = "insert into registrationdetails (UserName, Password) VALUES (req.query.unamereg,req.query.pswdreg)";
			con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Record Inserted Successfully!");
		});
	});

	module.exports = con

	//}
		
	response={
		UserName:req.query.unamereg,
		Password:req.query.pswdreg
	};
	console.log(response);
	res.end(JSON.stringify(response));
});

var list= fun.listen(8081,function(){
	var host = list.address().address
   var port = list.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});
