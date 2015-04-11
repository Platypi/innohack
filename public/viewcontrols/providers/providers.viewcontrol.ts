/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
import BaseViewControl = require('../../viewcontrols/base/base.viewcontrol');
import UserRepository = require('../../repositories/user/user.repository');

class ProvidersViewControl extends BaseViewControl {
    templateString: string = require('./providers.viewcontrol.html');
    context: any = {
        provider: null
    };
  
    constructor(private userRepository: UserRepository) {
        super();
    }

    initialize() {
        this.provider = this.userRepository.fetchUser().selectedProvider;
    }

    navigatedTo(parameter: { id: string; }) {

    }
}

plat.register.viewControl('providers-vc', ProvidersViewControl, [
    UserRepository
]);

export = ProvidersViewControl;
