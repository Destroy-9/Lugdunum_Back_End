var express = require('express');
var router = express.Router();

const methodsCtrl = require('../controllers/index');

/* GET home page. */
router.get('/', methodsCtrl.rendering);
router.post( '/', methodsCtrl.createUser);

module.exports = router;
