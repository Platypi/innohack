/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
import BaseViewControl = require('../../viewcontrols/base/base.viewcontrol');
import GeoCodingService = require('../../services/geocoding/geocoding.service');
import FactualRepository = require('../../repositories/factual/factual.repository');

class ProvidersViewControl extends BaseViewControl {
    templateString: string = require('./providers.viewcontrol.html');
    context: any = { 
        providers: []
    };
    constructor(private geocoding: GeoCodingService, private factual: FactualRepository) {
        super();
    }
    initialize() {
        
    }
    navigatedTo(parameter: { id: string; }) {

        this.geocoding.getLatLongForZip(parameter.id).then((coords) => {
            this.factual.all({ latitude: coords.lat, longitude: coords.lng }).then((results) => {
                this.context.providers = results;
            });
        }, (e) => { console.log(e);});
    }
}

plat.register.viewControl('providers-vc', 
    ProvidersViewControl,
    [GeoCodingService,
    FactualRepository]);

export = ProvidersViewControl;
