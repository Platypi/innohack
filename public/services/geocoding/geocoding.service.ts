/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
import BaseService = require('../../services/base/base.service');

class GeocodingService extends BaseService {

    getLatLongForZip(zip: string) {
        var url: string = "https://maps.googleapis.com/maps/api/geocode/json?address=%zip%&sensor=false&key=AIzaSyAvJLatVY5phzbCBp5ZSzNSrT4w0fjrGwE";
        return this._http.json<any>({
            url: url.replace('%zip%', zip)
        }).then((success: any) => {
            return success.response.results[0].geometry.location;
        });
    }
}

plat.register.injectable('geocoding-service', GeocodingService);

export = GeocodingService;
