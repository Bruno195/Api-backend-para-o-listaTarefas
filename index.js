const express = require('express')
var session = require('express-session')
var flash = require('express-flash')
var cookieParser = require('cookie-parser')
const app = express()

app.set('view engine', 'ejs') // trust first proxy

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

///express session
app.use(cookieParser("BBBBBBBBBBBBBBBBB"))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000}
}))

app.use(flash())

app.get('/', (req, res) => {
    let emailError = req.flash("Emailerror")
    let pontosError = req.flash("PontosError")
    let nomeError = req.flash("NomeError")
    let email = req.flash('email')
    emailError = (emailError.length == 0 || emailError == undefined ? undefined : emailError)
    pontosError = (pontosError.length > 20 || pontosError == undefined ? undefined : pontosError)
    nomeError = (nomeError.length == 0 || nomeError == undefined ? undefined : nomeError)
    email = (email.length < 0 || email == undefined ? undefined : email)

    res.render('index', {emailError, pontosError, nomeError, email: email})
})

app.post('/form', (req, res) => {
    let {email, nome, pontos} = req.body
    
    let emailError
    let pontosError;
    let nomeError;


    if(email == undefined || email == ""){
        emailError = "Email não pode estar vazio"
    } 

    if(nome == undefined || nome == ""){
        nomeError = "Nome não pode estar vazio"
    }

    if(pontos > 20 || pontos == ""){
        pontosError = "Pontos com limite até 20 e não pode estar vazio"
    
    }

    if(emailError || pontosError ||  nomeError){
        req.flash("Emailerror", emailError)
        req.flash("NomeError", nomeError)
        req.flash("PontosError", pontosError)

        req.flash("email", email)

        res.redirect("/")
    }else{
        res.send("Passou")
    }
  

})

app.listen(3002, () => {
    console.log("Eai")
})

//flash session = sessions that stay on in one requisitoi, allow information between routes