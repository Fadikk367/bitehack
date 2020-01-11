const express = require("express");
const database = require("../database/api");
const apiRoutesFunction = require("./default")

var mainRouter = express.Router();

var apiDashboardRoutes = apiRoutesFunction(database.model.dashboard)
mainRouter.use('/dashboard', apiDashboardRoutes);

var apiListRoutes = apiRoutesFunction(database.model.list)
mainRouter.use('/list', apiListRoutes);

var apiUserRoutes = apiRoutesFunction(database.model.user)
mainRouter.use('/user', apiUserRoutes);

module.exports = mainRouter