let express=require('express')
let ejs=require('ejs')
let bodyparser=require('body-parser')
let mysql=require('mysql')
let session=require('express-session')


mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_project"

})

let app=express()

app.use(express.static('public'))
app.set('view engine','ejs')

app.listen(3000)
app.use(bodyparser.urlencoded({extended:true}))
app.use(session({
secret:"secret"
,resave:false
,saveUninitialized:true,
cookie:{ secure:false }
}))

app.get('/',function(req,res){
    let con=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"node_project"
    
    })
    con.query("SELECT * FROM products",(err,result)=>{
        req.session.views=(req.session.views||0)+1
        var views=req.session.views
        res.render('pages/index',{result:result,views:views})

    })
   
})


app.post("/add_to_cart",function(req,res){
  let id=req.body.id
console.log("id:"+id)
  let name= req.body.name
  console.log("name:"+name)

  let price=req.body.price
  let sale_price= req.body.sale_price
  let quantity=req.body.quantity
  let image=req.body.image
  let product={id:id,name:name,price:price,sale_price:sale_price,quantity:quantity,image:image}
  console.log(product)
  req.session.cart=product

 
 //return to cart page
 res.redirect('/cart')
})

app.get('/cart',function(req,res){
let cart=req.session.cart
console.log("cart=>"+JSON.stringify(cart))
res.render('pages/cart',{cart:cart})
})
app.get("/about",function(req,res){
res.render("pages/about")
})

app.get("/brand",function(req,res){
    res.render("pages/brand")
    })
    app.get("/special",function(req,res){
    res.render("pages/special")
    })
    
app.get("/contact",function(req,res){
    res.render("pages/about")
    })