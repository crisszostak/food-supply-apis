"use strict";
const express = require('express');
const app = express();
const { Core } = require('./core/Core');
const { RouteBootstrap } = require('./core/route/RouteBootstrap');
const { DatabaseBootstrap } = require('./core/db/DatabaseBootstrap');
const { RepositoryBootstrap } = require('./core/repository/RepositoryBootstrap');
const { Container } = require('./core/container/Container');
const { ContainerProvider} = require('./core/container/ContainerProvider');

const container = new Container();
ContainerProvider.setContainer(container);

Core.run(app, [DatabaseBootstrap, RepositoryBootstrap, RouteBootstrap]);