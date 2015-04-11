/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseViewControl = require('../../viewcontrols/base/base.viewcontrol');
import FactualRepository = require('../../repositories/factual/factual.repository');
import UserRepository = require('../../repositories/user/user.repository');
import GeoCodingService = require('../../services/geocoding/geocoding.service');

class ProcedureViewControl extends BaseViewControl {
    templateString: string = require('./procedure.viewcontrol.html');
    context: any = {
        user: null,
        providers: <Array<models.IHealthcareProvider>>[]
    };

    constructor(private repository: FactualRepository,
        private userRepository: UserRepository, 
        private geocoding: GeoCodingService, 
        private factual: FactualRepository) {
        super();
    }

    initialize(): void {
        var context = this.context;
        context.user = this.userRepository.fetchUser();
    }

    navigatedTo(parameter: any) {
        this.geocoding.getLatLongForZip(parameter.id).then((coords) => {
            this.factual.all({ latitude: coords.lat, longitude: coords.lng }).then((results) => {
                this.context.providers = results;
            });
        }, (e) => { console.log(e);});
    }

    goBack() {
        this.navigator.goBack();
    }
}

plat.register.viewControl('procedure-vc', ProcedureViewControl, [
    FactualRepository,
    UserRepository,
    GeoCodingService,
    FactualRepository
]);

export = ProcedureViewControl;
