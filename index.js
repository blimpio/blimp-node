var _ = require('lodash');
var request = require('request');

function Blimp(credentials) {
    this.appId = credentials.appId;
    this.apiKey = credentials.apiKey;
    this.secret = credentials.secret;
    this.username = credentials.username;

    this.headers = {
        'content-type': 'application/json',
        'authorization': 'ApiKey ' + this.username + ':' + this.apiKey,
        'x_blimp_appid': this.appId,
        'x_blimp_secret': this.secret
    };

    this.url = 'https://app.getblimp.com/api/v2/';
}

Blimp.prototype.get = function(resource, id, params, callback) {
    var options = {
        url: this.url + resource + '/',
        headers: this.headers
    };

    if (arguments.length === 2) {
        if (_.isFunction(id)) callback = id;
    }

    if (arguments.length === 3) {
        callback = params;
        if (_.isPlainObject(id)) params = id;
    }

    if (arguments.length === 4) options.qs = params;

    if (_.isNumber(id)) options.url += id + '/';

    request.get(options, function(error, response, body) {
        if (!error && callback) callback(body);
    });
};

Blimp.prototype.post = function(resource, data, params, callback) {
    var options = {
        url: this.url + resource + '/',
        body: JSON.stringify(data),
        headers: this.headers
    };

    if (arguments.length === 3) callback = params;

    if (arguments.length === 4) options.qs = params;

    request.post(options, function(error, response, body) {
        if (!error && callback) callback(body);
    });
};

Blimp.prototype.put = function(resource, id, params, data, callback) {
    var options = {
        url: this.url + resource + '/' + id + '/',
        body: JSON.stringify(data),
        headers: this.headers
    };

    if (arguments.length === 4) {
        callback = data;
        data = params;
        options.body = JSON.stringify(data);
    }

    if (arguments.length === 5) options.qs = params;

    request.put(options, function(error, response, body) {
        if (!error && callback) callback(body);
    });
};

Blimp.prototype.del = function(resource, id, callback) {
    var options = {
        url: this.url + resource + '/',
        headers: this.headers
    };

    if (arguments.length === 2)  {
        if (_.isFunction(id)) callback = id;
    }

    if (_.isNumber(id)) options.url += id + '/';

    request.del(options, function(error, response, body) {
        if (!error && callback) callback(body);
    });
};

Blimp.prototype.schema = function(resource, callback) {
    var options = {
        url: this.url + resource + '/schema',
        headers: this.headers
    };

    request.get(options, function(error, response, body) {
        if (!error && callback) callback(body);
    });
};

module.exports = Blimp;
