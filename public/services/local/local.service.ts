/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseService = require('../../services/base/base.service');

class LocalService extends BaseService {
    getInsuranceProviders() {
        return this._http.json<any>({
            url: 'assets/data/insurance.json'
        }).then((success) => {
            return success;
        });
    }
}

plat.register.injectable('local-service', LocalService);

export = LocalService;
