/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
import BaseViewControl = require('../../viewcontrols/base/base.viewcontrol');


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

        
    }
}

plat.register.viewControl('providers-vc', 
    ProvidersViewControl,
    []);

export = ProvidersViewControl;
