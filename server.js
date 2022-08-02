/*  CRUD (Create,Read,Update,Delete) a.k.a (POST, GET, PUT, DELETE) which is used for Rest API's
    Browsers perform the READ operation whenever you visit a site, and under the hood the send a GET
     request to the server to perform this READ operation. So we will always see 'Cannot GET /' at first because the 
     server sent nothing to the browser.
*/
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = 8000;

// app.listen(process.env.PORT || PORT, () => {
//   console.log(`Server is running on ${PORT}, better catch it!`);
// });

//Because express doesnt handle reading data on its own, we install body-parser (middleware used to help tidy the request object before usage.)
//! BODY PARSER COMES BEFORE CRUD HANDLERS
//'urlencoded' tells it to extract data from <form> and add it to the body
// app.use(bodyParser.urlencoded({ extended: true }));

//Make a GET request
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
//   //__dirname is the current directory we're in, and the sendFile tells Express to serve our index.html
// });

//CREATE operation, only done when browser sends a POST req to the server. (Can be done via forms or JS)

//Here we handle the POST req with a post method in our js file, the path should be the value in <action> attribute.
// app.post("/quotes", (req, res) => {
//   console.log(req.body);
// });

//Now we want to be able to retrieve this data the next time we load the page which is where MongoDB comes in, MongoDb is a database, it's where we store website information and get data from

//connect to MongoDB through MongoClient's connect method
const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  `mongodb+srv://severicus:Xt3wyg98@cluster0.j85h2d6.mongodb.net/?retryWrites=true&w=majority`,
  { useUnifiedTopology: true }
)
  .then((client) => {
    // console.log("Connected to Database");
    //changing database from 'test'
    const db = client.db("star-wars-quotes");

    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.json());
    app.get("/", (req, res) => {
      //Use find method to get quotes stored in MongoDB
      const cursor = db.collection("quotes").find();
      //   console.log(cursor);
      //   res.sendFile(__dirname + "/index.html");

      //Use toArray to to convert our data into an array
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => res.render("index.ejs", { quotes: results }))
        // .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((err) => console.log(err));
      console.log(req.body);
    });
    //!PUT Request
    app.put("/quotes", (req, res) => {
      quotesCollection
        .findOneAndUpdate(
          { name: "Ahmed Alimohamed" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          res.json("Success");
        })
        .catch((error) => console.error(error));
    });
    //!Delete Requet
    app.delete("/quotes", (req, res) => {
      quotesCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          if (result.deletedCount === 0) {
            return res.json("No quote to delete");
          }
          res.json("Deleted Luke's quote");
        })
        .catch((error) => console.error(error));
    });
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server is running on ${PORT}, better catch it!`);
    });

    //Use insertOne method to add items to our collection
    const quotesCollection = db.collection("quotes");
  })
  .catch((error) => console.error(error));
//Store database on MongoDB atlas (cloud service)

//Now to display the data from the database, we must get our quotes from Atlas and render them into HTML with a template engine
