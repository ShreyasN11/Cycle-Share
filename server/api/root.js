const express = require('express');
const router = express.Router();
const path = require('path');
const {getname, getemail} = require('./get');
const {addUser,checkUser} = require('./addUser');
const {addListedCycle, getListedCycle, getListedCyclebyId} = require('./Cycle');

router.get('/getname', getname);
router.get('/getemail', getemail);
router.get('/checkUser/:userId', checkUser);
router.get('/getListedCycle/:ownerid', getListedCycle);
router.get('/getListedCyclebyId/:cycleid', getListedCyclebyId);

router.post('/addUser', addUser);
router.post('/addListedCycle', addListedCycle);


module.exports = router;