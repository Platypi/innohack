/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
import BaseViewControl = require('../base/base.viewcontrol');

class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.viewcontrol.html');

    context: any = {};
}

plat.register.viewControl('home-vc', HomeViewControl);

export = HomeViewControl;
