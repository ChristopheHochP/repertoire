/* global console, exports, require */

var ensureLoggedIn = require('../middleware').ensureLoggedIn,
    ContactService = require('../services').contacts,
    Contact = new ContactService();

function contactsAll(req, res) {
    "use strict";
    //        console.log('Request.' + req.url);
    //
    //        Contact.all(function(error, contacts) {
    //            if(error) {
    //                return res.json(error.code, { error: error.message });
    //            }
    //            if(!contacts) {
    //                contacts = {};
    //            }
    //            return res.json(200, contacts);
    //        });

}

exports.all = [
    ensureLoggedIn.index,
    contactsAll
];