const express  = require('express');
const router = express.Router();

const Card  = require('../models/Card');
const Deck = require('../models/Deck');
const User = require('../models/User');

router.get('/cards/:card', function (req, res) {
  const card = req.params.card;
  Card.find({name: card})
    .then(card => {
      res.status(200).json(card);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/cards/', function (req, res) {
  Card.find()
    .then(cards => {
      res.status(200).json(cards);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/decks/:deck', function(req, res) {
  const deck = req.params.deck;
  Deck.find({name:deck})
    .then(deck => {
      res.status(200).json(deck);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/decks/', function (req, res) {
  Deck.find()
    .then(decks => {
      res.status(200).json(decks);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/decks/', function (req, res) {
  const deck = new Deck(req.body);
  deck.save()
    .then(d => {
      res.status(200).json(d);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/users/:user', function (req, res) {
  const user = req.params.user;
  User.find({name:user})
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/users/', function (req, res) {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
