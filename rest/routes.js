const  {signup,signin,createusers,getusers,getuser,updateuser,deleteuser}  =require('../rest/service');
const router=require('express').Router();
const { genSaltSync,hashSync,compareSync}=require('bcryptjs');
const {sign,verify}=require('jsonwebtoken');
const { check }=require('../jwt');
//signup
router.post('/signup',(req,res)=>
	{   const salt=genSaltSync(10);
		req.body.password=hashSync(req.body.password,salt);
		signup(req.body,(err,result)=>{
        if(err){console.log('err');return;}
        if(result){return res.send('name already exist');}
        return res.json({
        status:"200",
        result:"signup hogya"  
        });
         }
		);
	});
//siginin
router.post('/signin',(req,res)=>
	{   
		signin(req.body,(err,result)=>{
        if(err){console.log('err');return;}
        if(!result){return res.send('name not exist');}
        const token=sign(req.body,'qwertyuiop');
        const compare=compareSync(req.body.password,result[0].password);
        if(!compare){
        	return res.send('password not match');
        }
        return res.json({
        	result:"success signin",
        	token:token
        });
    }
		);
	});



//create
router.post('/',(req,res)=>{
createusers(req.body,(err,result)=>
	{if(err){console.log('err');return;}
      return res.json({
      status:'200',
      message:'ho gya user add',
      result:result}); 
	});

});
//READ

router.get('/',check,(req,res)=>{
getusers({},(err,result)=>
	{if(err){console.log('err');return;}
      return res.json({
      status:'200',
      message:'yeh sarre users',
      result:result}); 
	});

});

router.get('/:id',(req,res)=>{
getuser(req.params.id,(err,result)=>
	{if(err){console.log('err');return;}
      return res.json({
      status:'200',
      message:'yeh le user apna',
      result:result}); 
	});
});
//UPDATE

router.patch('/:id',(req,res)=>{
updateuser(req.params.id,req.body,(err,result)=>
	{if(err){console.log('err');return;}
      return res.json({
      status:'200',
      message:'ho gya user update',
      result:result}); 
	});

});
//DELETE
router.delete('/',(req,res)=>{
deleteuser(req.body,(err,result)=>
	{if(err){console.log('err');return;}
      return res.json({
      status:'200',
      message:'ho gya delete',
      result:result}); 
	});
});

module.exports=router;