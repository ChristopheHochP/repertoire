/* global __dirname, module, require */

(function () {
    'use strict';

    var express = require('express'),
        path = require('path'),
        cookieParser = require('cookie-parser'),
        logger = require('morgan'),
        methodOverride = require('method-override'),
        expressJwt = require('express-jwt'),
        bodyParser = require('body-parser'),
        multer = require('multer'),
        errorHandler = require('errorhandler'),
        config = require('./configuration'),
        db = require('./database'),
        routes = require('./routes'),
        middleware = require('./middleware'),
        app = express();

    app.set('port', config.get('express:port'));
    if ('development' === app.get('env')) {
        app.use(errorHandler());
        app.use(logger('dev', {
            immediate: true
        }));
    }
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, 'public')));

    app.post('/registration', routes.registration.index);
    app.post('/authenticate', routes.authentication.index);

    app.get('/api/contacts', expressJwt({
        secret: config.get('session:secret')
    }), routes.contacts.all);
    app.get('/api/contacts/:id', expressJwt({
        secret: config.get('session:secret')
    }), routes.contacts.find);
    app.post('/api/contacts', expressJwt({
        secret: config.get('session:secret')
    }), routes.contacts.create);

    app.use(middleware.notFound.index);

    app.listen(app.get('port'));
    module.exports = app;
}());
