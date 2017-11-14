const _ = require('lodash');
const environmentRouter = require('express').Router();environments = []; //array of object
var id = 0;
const updateId = (req, res, next) => {

  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();

}

environmentRouter.param('id', (req, res, next, id) => {

  let environment = _find(environments, {id: id});

  if (environment) {

    req.environment = environment;

    next();

  } else {

    res.send();

  }

});


environmentRouter.get('/', (req, res) => {

  res.json(environments);

});

environmentRouter.get('/:id', (req, res) => {

  let environment = req.environment;

  res.json(environment || {});

})

environmentRouter.post('/', updateId, (req, res) => {

  let environment = req.body;

  environments.push(environment);

  res.json(environment);

});

environmentRouter.put('/:id', (req, res) => {

  let update = req.body;

  if (update.id) {

    delete update.id;

  }

  let environment = _.findIndex(environments, {id: req.params.id});

  if (!environments[environment]) {

    res.send();

  } else {

    let updateEnvironment = _.assign(environments[environment], update);

    res.json(updateEnvironment);

  }

});

environmentRouter.delete('/:id', (req, res) => {

  let environment = _.findIndex(environments, {id: req.params.id});

  environments.splice(environment, 1);

  res.json(req.environment);

});

module.exports = environmentRouter;
