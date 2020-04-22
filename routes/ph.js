const router = require('express').Router()
const phControl = require('../controller/ph')

router.get('/', phControl.getList)


module.exports = router