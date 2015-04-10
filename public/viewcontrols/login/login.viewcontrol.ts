/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseViewControl = require('../../viewcontrols/base/base.viewcontrol');

class LoginViewControl extends BaseViewControl {
    templateString: string = require('./login.viewcontrol.html');
    context: any = { };
    
}

plat.register.viewControl('login-vc', LoginViewControl);

export = LoginViewControl;
