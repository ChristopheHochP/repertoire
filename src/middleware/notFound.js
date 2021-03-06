/* global exports, require */

var logger = require('../logger').winston;

function notFound(req, res, next) {
    'use strict';
    logger.info('The ressource ' + req.url + ' was not found');
    res.status(404).json({
        error: 'Ressource not found'
    });
}

exports.index = notFound;
