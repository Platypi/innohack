/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseService = require('../base/base.service');
var key = 'WDNBOpDcaX9BJuAnnHsBc8Gjk45rxGkFJU2z7H1Y',
    secret = 'RTHGz6HGETI4grA12fdze7JzXTYAleVEIBiN1geX';

class FactualService extends BaseService {
    baseUrl: string = 'http://api.v3.factual.com:80/t/healthcare-providers-us';

    all(filter?: config.IFilter): plat.async.IThenable<any> {
        return this.request(filter);
    }

    private request(filter?: config.IFilter, endpoint: string = '') {
        if (endpoint.length > 0 && endpoint[0] !== '/') {
            endpoint = '/' + endpoint;
        }

        var url = this.baseUrl + endpoint + this.processFilter(filter);

        return this._http.json<any>({
            url: url,
            contentType: this._http.contentType.ENCODED_FORM
        }).then((success) => {
            return success.response.response.data;
        });
    }

    private processFilter(filter: config.IFilter) {
        var str = '?KEY=' + key;

        if (!this._utils.isObject(filter)) {
            return str;
        }

        var geo: any,
            filters: any = {};

        if (this._utils.isNumber(filter.latitude)) {
            geo = {
                $circle: {
                    $center: [
                        filter.latitude,
                        filter.longitude
                    ],
                    $meters: filter.meters || 5000
                }
            };
        }

        if (this._utils.isArray(filter.insurances)) {
            filters.insurances = {
                $in: filter.insurances
            };
        }

        if (this._utils.isArray(filter.category_labels)) {
            filters.category_labels = {
                $includes_any: filter.category_labels
            };
        }

        if (!this._utils.isEmpty(filters)) {
            str += '&filters=' + JSON.stringify(filters);
        }

        if (!this._utils.isEmpty(geo)) {
            str += '&geo=' + JSON.stringify(geo);
        }

        return str;
    }
}

plat.register.injectable('factual-service', FactualService);

export = FactualService;
