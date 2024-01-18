const express = require("express");
const app = express();

const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");

// /check/:zip route

app.get("/check/:zip", validateZip, (req, res, next) => {
        const {zip} = req.params;
        if (getZoos(zip)) {
            res.send(`${zip} exists in our records.`)
        } else {
            res.send(`${zip} does not exist in our records.`)
        }
    }
);

// /zooz/all route

app.get("/zoos/all", (req, res, next) => {
      const admin = req.query.admin;
      if (admin ==='true') {
        res.send(`All zoos: ${getZoos().join(`; `)}`)
      } else {
        res.send(`You do not have access to that route.`)
      }
  next();
})

// /zoos/:zip route

app.get("/zoos/:zip", validateZip, (req, res, next) => {
    const {zip} = req.params;
    const zoos = getZoos(zip);
    if(zoos.length) {
      res.send(`${zip} zoos: ${zoos.join(`; `)}`)
    } else {
      res.send(`${zip} has no zoos.`)
    }
  }
);

//  handles requests 
app.use((req, res, next) => {
    res.send(`That route could not be found!`);
  });

// error handeling 
app.use((err, req, res, next) => {
    console.log(err);
    res.send(err);
})

module.exports = app;