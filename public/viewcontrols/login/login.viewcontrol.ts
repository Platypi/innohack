/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseViewControl = require('../../viewcontrols/base/base.viewcontrol');
import ProfileViewControl = require('../../viewcontrols/profile/profile.viewcontrol');

class LoginViewControl extends BaseViewControl {
    templateString: string = require('./login.viewcontrol.html');
    context: any = { };

    login() {
        this.navigator.navigate(ProfileViewControl);
    }
}

plat.register.viewControl('login-vc', LoginViewControl);

export = LoginViewControl;
