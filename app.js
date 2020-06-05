const express=require('express');
const routing=require('./rest/routes');
const app=express();
app.use(express.json());
app.use('/',routing);
app.listen(3000,()=>{console.log("app listen to port:3000")});