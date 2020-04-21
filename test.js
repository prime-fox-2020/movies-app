const express=require('express')
const app=express()
// const router=require('./routers')
const port=3000
const {Movie, ProductionHouse,Cast,MovieCast}=require('./models')
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
// app.use('/',router)


app.get('/',(req,res)=>{
    Cast.findAll({
        include:[{model: Movie}]
    })
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send(err)
    })
})

app.listen(port,function(){
    console.log(`Listening to port ${port}`)
})