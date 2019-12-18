const fetch = require('node-fetch');
const CustomerModel = require('./CustomerModel');

const CustomerController = {};

// Controller to create customer
CustomerController.createcustomer = (req, res, next) => {
  const { name, age, address } = req.body;
  CustomerModel.create({ name, age, address }, (error, result) => {
    if (error) {
      console.log(`Customer could not be created in database ${error}`);
      return res.status(404).json(error);
    }
    res.locals.createcustomer = result;
    console.log(`Customer creation successful ${res.locals.createcustomer}`);
    return next();
  });
};

//  Controller to get all customers
CustomerController.getcustomers = (req, res, next) => {
  CustomerModel.find({}, (error, result) => {
    if (error) {
      console.log(`Customer could not be found in database ${error}`);
      return res.status(404).json(error);
    }
    res.locals.getcustomers = result;
    console.log(`Customer selection successful ${res.locals.getcustomers}`);
    return next();
  });
};

//  Controller to delete a customer
CustomerController.deletecustomer = (req, res, next) => {
  const { id } = req.query;
  CustomerModel.findOneAndDelete({ _id: id }, (error, result) => {
    if (error) {
      console.log(`Customer deletion was not successful ${error}`);
      return res.status(404).json(error);
    }
    res.locals.deletecustomer = result;
    console.log(`Customer deletion successful ${res.locals.deletecustomer}`);
    return next();
  });
};


//  Controller to get info from the books application
CustomerController.getbooksinfo = (req, res, next) => {
  //  const { body } = req;
  fetch('http://localhost:4545/getbooks', {
    method: 'GET',
    headers: {
      'Content-Type': 'Application/JSON',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then((results) => {
      //  const info = results.forEach((curr) => JSON.stringify((curr)));
      res.locals.booksinfo = results;
      return next();
    })
    .catch((error) => {
      console.log(`There was an error in getting customers data ${error}`);
    });
};
module.exports = CustomerController;
