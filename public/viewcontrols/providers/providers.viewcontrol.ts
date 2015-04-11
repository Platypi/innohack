/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseViewControl = require('../../viewcontrols/base/base.viewcontrol');

class ProvidersViewControl extends BaseViewControl {
    templateString: string = require('./providers.viewcontrol.html');
    context: any = { 
        providers: []
    };
}

plat.register.viewControl('providers-vc', ProvidersViewControl);

export = ProvidersViewControl;
