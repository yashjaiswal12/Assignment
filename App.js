const express = require('express');
const app = express();
const mysql = require("./Connection").con;
const port=8081

//configuration
app.set("view engine","hbs");
app.set("views","./view");
app.use(express.static("public"));

//Routing
app.get("/",(req,res)=>{
	res.render("index")
});

app.get("/add",(req,res)=>{
	res.render("add")
});
app.get("/update",(req,res)=>{
	res.render("update")
});
app.get("/delete",(req,res)=>{
	res.render("delete")
});
app.get("/show",(req,res)=>{
	res.render("show")
});

app.get("/addstudent",(req,res)=>{
	const id = req.query.id1;
	const name = req.query.name;
	const percentage = req.query.percentage;
	const city = req.query.city;
	let query1 = "select * from student where stud_id=?";
	
	mysql.query(query1,[id],(err,result)=>{
		if(err) throw err;
		else{
			if(result.length>0){
				res.render("add",{checkmesg:true});
			}
			else{
				let query2 = "insert into student values (?,?,?,?)";
				mysql.query(query2,[id,name,percentage,city],(err,result)=>{
					if(err) throw err;
					else{
						if(result.affectedRows>0){
							res.render("add",{mesg:true});
						}
					}
				});
			}
		}
	});
});

app.get("/deletestudent",(req,res)=>{
	const id = req.query.id1;
	let query1 = "select * from student where stud_id=?";
	
	mysql.query(query1,[id],(err,result)=>{
		if(err) throw error;
		else{
			if(result.length>0){
				let query2 = `delete from student where stud_id=?`;
				mysql.query(query2,[id],(err,result)=>{
					if(err)throw err;
					else{
						if(result.affectedRows>0){
							res.render("delete",{mesg1:true});
						}
					}
				});
			}
			else{
				res.render("delete",{mesg2:true});
			}
		}
	});
});

app.get("/updatestudent",(req,res)=>{
	const id = req.query.id1;
	const name = req.query.name;
	const percentage = req.query.percentage;
	const city = req.query.city;
	
	let query1 = "select * from student where stud_id=?";
	mysql.query(query1,[id],(err,result)=>{
		if(err) throw err;
		else{
			if(result.length>0){
				let query2 = `update student set stud_name=?,stud_percentage=?,stud_address=? where stud_id=?`;
				mysql.query(query2,[name,percentage,city,id],(err,result)=>{
					if(err)throw err;
					else{
						if(result.affectedRows>0){
							res.render("update",{umesg:true});
						}
					}
				});
			}
			else{
				res.render("update",{mesg2:true});
			}
		}
	});
});


//create server
app.listen(port,(err)=>{
	if(err) throw err;
	else console.log("Server is running at %d:",port);
})