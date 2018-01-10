/* Import */
var express         = require("express");
var bodyParser      = require("body-parser");
var path            = require("path");
var mongoose        = require("mongoose");


// Connect to MongoDB database
//mongoose.connect("mongodb://localhost/guests", {useMongoClient: true});
var connection = mongoose.connect("mongodb://sara:therawman@ds247317.mlab.com:47317/guests", {useMongoClient: true});



mongoose.Promise = global.Promise;

//Import schema
var Guests = require("./models/guests"); 

// Create instance of express
var app = express();  

/* 
"Middleware" 
Makes webbservice avaiable from other domains
*/
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
    next();  
});

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

// Create static search path
app.use(express.static(path.join(__dirname, 'public')));

// Port for connection
var port = Number(process.env.PORT || 3000);



// Start server
app.listen(port, function () {
    console.log("Servern är startad på port " + port);
});


// REST-api for guests ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Send all guests from databse ///////////////////////////////
app.get("/api/guests", function (req, res) {
    Guests.find(function(err, guests){
        if (err) {
            res.json(err);
        } else { 
            res.json(guests);
               }
    })
    
});

// Read specifik guest by id ///////////////////////////////// not implemented in frontend 
app.get("/api/guests/:id", function (req, res) {
    Guests.findById(req.params.id, function(err, guests){
        if(err) {
            res.json(err);
        } else {
            res.json(guests);
        }
    });
});


// Add guest to database /////////////////////////////////////
app.post("/api/guests/add", function (req, res) {

    var guest = new Guests();
    guest.name = req.body.name;
    guest.note = req.body.note;

    guest.save(function(err){
        if(err) {
            res.json(err);
        } else {
            res.json({ message: "Gäst tillagd!"})
        }
    });
});


// Book guest by id ///////////////////////////////////////////
app.put('/api/guests/check/:id', function (req, res) {  
var conditions = { _id: req.params.id,
 };

Guests.update(conditions, req.body)
.then(doc =>{
if(!doc) { return res.status(404).end(); }
return res.status(200).json(doc);
})
.catch (err => next(err));
});


// Delete guest by id //////////////////////////////////////
app.delete("/api/guests/delete/:id", function (req, res) {
    Guests.remove({_id: req.params.id}, function(err){
        if(err) {
            res.json(err);
        } else {
            res.json ({ message: "Gäst borttagen" })
        }
    })
});

// Delete all guests //////////////////////////////////////
app.delete("/api/guests/delete", function (req, res) {
    Guests.remove({}, function(err){
        if(err) {
            res.json(err);
        } else {
            res.json ({ message: "Gäst borttagen" })
        }
    });
});

