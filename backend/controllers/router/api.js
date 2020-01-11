const express = require("express");
const database = require("../database/api");
const apiRoutesFunction = require("./default")

var mainRouter = express.Router();

var apiDashboardRoutes = apiRoutesFunction(database.model.dashboard)
mainRouter.use('/dashboard', apiDashboardRoutes);

var apiListRoutes = apiRoutesFunction(database.model.list)
mainRouter.use('/list', apiListRoutes);

var apiTagRoutes = apiRoutesFunction(database.model.tag)
mainRouter.use('/tag', apiTagRoutes);

module.exports = mainRouter