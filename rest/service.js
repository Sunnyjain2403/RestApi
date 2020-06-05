const pool=require('../config/database');



const object={
//signup
signup:(data,callback)=>
{pool.query(`select * from registration where username=?`,[data.username],
       (err,result,fields)=>
       {if(err){return callback(err);}
        if(result.length>=1){return callback(null,result);}

        pool.query(`insert into registration(username,password)
                         values(?,?)`,
            [data.username,data.password],
            (err,result,fields)=>
             {
             	if(err){return callback(err);}
             	return callback(null,null);
             	
             }
    );
    }
	);
},
//signin
signin:(data,callback)=>
{pool.query(`select * from registration where username=?`,[data.username],
       (err,result,fields)=>
       {if(err){return callback(err);}
        if(result.length==0){return callback(null,null);}
        return callback(null,result);
        });
  
},



//CREATE
createusers:(data,callback)=>{
pool.query(
`insert into sample(firstname,lastname,email,password) values(?,?,?,?)`,
[data.firstname,data.lastname,data.email,data.password],
(err,result,fields)=>
{
if(err){return callback(err);}
return callback(null,result);
}
);
},
//READ
getusers:(data,callback)=>{
pool.query(
`select * from sample`,
(err,result,fields)=>
{
if(err){return callback(err);}
return callback(null,result);
}
);
},
//READ
getuser:(id,callback)=>{
pool.query(
`select * from sample where id=?`,
[id],
(err,result,fields)=>
{
if(err){return callback(err);}
return callback(null,result);
}
);
},
//update
updateuser:(id,data,callback)=>{
pool.query(
`update sample set firstname=?,lastname=?,email=?,password=? where id=?`,
[data.firstname,data.lastname,data.email,data.password,id],
(err,result,fields)=>
{
if(err){return callback(err);}
return callback(null,result);
}
);
},
//delete
deleteuser:(data,callback)=>{
pool.query(
`delete from sample where id=?`,[data.id],
(err,result,fields)=>
{
if(err){return callback(err);}
return callback(null,result);
}
);
}
};


module.exports=object;