/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
import BaseViewControl = require('../base/base.viewcontrol');
import FactualRepository = require('../../services/factual/factual.service');

class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.viewcontrol.html');

    context: any = {};

    constructor(private repository: FactualRepository) {
        super();
    }

    initialize() {
        this.repository.all({
            latitude: 47.311049,
            longitude: -122.580001,
            insurances: ['Humana'],
            category_labels: ['Chiropractors', 'Dentists']
        }).then((value) => {
            console.log(value);
        }).catch((e) => {
            console.log(e);
        });
    }
}

plat.register.viewControl('home-vc', HomeViewControl, [
    FactualRepository
]);

export = HomeViewControl;
