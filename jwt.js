const { verify }=require('jsonwebtoken');
module.exports={
check:(req,res,next)=>
{
if(!req.body.token){
return res.send('no token');
}
if(req.body.token)
{
verify(req.body.token,'qwertyuiop',(err,decoded)=>
{if(err)
{
	return res.send('token not valid');
}
else {
	next();
}});

}
}}