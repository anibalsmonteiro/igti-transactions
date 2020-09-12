const express = require('express');
const transactionRouter = express.Router();
const transactionServices = require('../services/transactionService.js');

transactionRouter.post('/', transactionServices.create);
//prettier-ignore
transactionRouter.get('/findAllByPeriod/:period', transactionServices.findAllByPeriod);
transactionRouter.get('/:id', transactionServices.findOne);
transactionRouter.put('/:id', transactionServices.update);
transactionRouter.delete('/:id', transactionServices.remove);

module.exports = transactionRouter;
