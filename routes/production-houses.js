const { Router } = require('express');
const productionHousesRouter = Router();
const ProductionHouseController = require('../controllers/production-house');

productionHousesRouter.get('/', ProductionHouseController.list);

module.exports = productionHousesRouter;