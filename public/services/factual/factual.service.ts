/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseService = require('../base/base.service');
var key = 'WDNBOpDcaX9BJuAnnHsBc8Gjk45rxGkFJU2z7H1Y',
    secret = 'RTHGz6HGETI4grA12fdze7JzXTYAleVEIBiN1geX';

class FactualService extends BaseService {
    baseUrl: string = 'http://api.v3.factual.com:80/t/healthcare-providers-us';

    all(): plat.async.IThenable<any> {
        return this.request();
    }

    private request(endpoint: string = '') {
        if (endpoint.length > 0 && endpoint[0] !== '/') {
            endpoint = '/' + endpoint;
        }

        return this._http.json<any>({
            url: this.baseUrl + endpoint + '?KEY=' + key,
            contentType: this._http.contentType.ENCODED_FORM
        }).then((success) => {
            return success.response.response.data;
        });
    }
}

plat.register.injectable('factual-service', FactualService);

export = FactualService;
