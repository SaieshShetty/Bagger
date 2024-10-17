const express = require('express') ;
const app = express() ;
const cookieParser = require('cookie-parser') ;
const path = require('path') ;
const flash = require('connect-flash') ;
const expressSession = require('express-session') ;
const db = require('./config/mongoose-connection') ;

require('dotenv').config() ;

const ownerRouter = require('./routes/ownerRouter')
const productRouter = require('./routes/productRouter')
const userRouter = require('./routes/userRouter')
const indexRouter = require('./routes/index')

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;
app.use(cookieParser()) ;
app.use(
    expressSession({
        resave : false,
        saveUninitialized : false,
        secret : process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash()) ;
app.use(express.static(path.join(__dirname , "public"))) ;
app.set("view engine" , 'ejs') ;

app.use('/' , indexRouter) ;
app.use('/owners', ownerRouter) ;
app.use('/users', userRouter) ;
app.use('/products', productRouter) ;


app.listen(3000) ;
