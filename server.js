const express = require ('express');
const hbs = require ('hbs');
const fs = require ('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log('Unable to append...');
    }
  })
  next();
});

// app.use((req,res,next) => {
//   res.render('maintain.hbs',{
//
//   })
// });

// app.get('/',(req,res) =>{ //JSON
//   // res.send('<h1><i>Hello express!</i></h1>');
//   res.send({
//     name: 'Valentin',
//     likes: [
//       'coding',
//       'family'
//     ]
//   })
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrenYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})

app.get('/',(req,res) =>{
  res.render('home.hbs',{  //folder views
    pageTitle: 'Welcome',
    currentYear: new Date().getFullYear(),
    welcome: 'greetings'
  });
})

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About',
    currentYear: new Date().getFullYear()
  });
})

app.get('/bad', (req,res) => {
  res.send({
    error: 'Error',
  })
})


app.listen(port, ()=> {
  console.log(`Server is up on port ${port}`);
});
