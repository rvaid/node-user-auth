var express = require('express');
var router = express.Router();
var verifyToken = require('../auth/VerifyToken');
var userService = require('./UserService')



router.post('/balanced', verifyToken, userService.validateAccess, userService.checkBrackets)

router.post('/delete', verifyToken, userService.validateAccess, userService.deleteUser)

router.get('/all', verifyToken, userService.validateAccess, userService.listAllUsers)

module.exports = router;