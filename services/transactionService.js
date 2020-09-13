const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');
const transactionServices = {};

transactionServices.create = async (req, res) => {
   try {
      const transaction = new TransactionModel(req.body);
      await transaction.save();

      res.status(200).send({ message: 'Lançamento inserido com sucesso' });
   } catch (err) {
      res.status(500).send({
         message: err.message || 'Algum erro ocorreu ao salvar',
      });
   }
};

transactionServices.findAllByPeriod = async (req, res) => {
   const { description } = req.query;

   var condition = description
      ? { description: { $regex: new RegExp(description), $options: 'i' } }
      : {};

   try {
      const period = req.params.period;

      const transactions = await TransactionModel.find({
         $and: [{ yearMonth: period }, condition],
      });

      res.status(200).send(transactions);
   } catch (err) {
      res.status(500).send({
         message: err.message || 'Algum erro ocorreu ao buscar as transações',
      });
   }
};

transactionServices.findOne = async (req, res) => {
   try {
      const id = req.params.id;
      const transaction = await TransactionModel.findById({ _id: id });

      if (!transaction) {
         res.status(404).send();
      }

      res.status(200).send(transaction);
   } catch (err) {
      res.status(500).send({
         message: err.message || 'Algum erro ocorreu ao buscar a transação',
      });
   }
};

transactionServices.update = async (req, res) => {
   try {
      const id = req.params.id;
      const transaction = await TransactionModel.findByIdAndUpdate(
         { _id: id },
         req.body,
         { new: true }
      );

      res.status(200).send(transaction);
   } catch (err) {
      res.status(500).send({
         message: err.message || 'Algum erro ocorreu ao atualizar a transação',
      });
   }
};

transactionServices.remove = async (req, res) => {
   try {
      const id = req.params.id;
      await TransactionModel.findByIdAndRemove({ _id: id });

      res.status(200).send({ message: 'Transação excluída com sucesso' });
   } catch (err) {
      res.status(500).send(false);
   }
};

module.exports = transactionServices;
