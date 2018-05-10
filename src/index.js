console.log('mean hello app');
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

//const indexRoutes = require('./routes/index');
const tasksRoutes = require('./routes/tasks');

//settings
app.set('views',path.join(__dirname,'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
//app.use(indexRoutes);
app.use(tasksRoutes);

//static files
app.use(express.static(path.join(__dirname,'dist')));

app.listen(app.get('port'),()=>{
    console.log('servidor en puerto',app.get('port'))
});
