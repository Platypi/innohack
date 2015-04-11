/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseViewControl = require('../../viewcontrols/base/base.viewcontrol');
import UserRepository = require('../../repositories/user/user.repository');
import ProcedureViewControl = require('../../viewcontrols/procedure/procedure.viewcontrol');

class ScheduleViewControl extends BaseViewControl {
    templateString: string = require('./schedule.viewcontrol.html');
    context: any = { 
        user: null,
        services: [
            { 
                name: "Physical",
                description: "",
                interval: "year",
                intervalcount: 1
            }, {
                name: "Flu Shot",
                description: "",
                interval: "year",
                intervalcount: 1
            }, {
                name: "Eye Exam",
                description: "",
                interval: "year",
                intervalcount: 1
            }, {
                name: "Dental Cleaning",
                description: "",
                interval: "month",
                intervalcount: 6
            }, {
                gender: "Female",
                name: "Mammogram",
                description: "",
                interval: "year",
                intervalcount: 1
            }, {
                name: "Prostate Exam",
                description: "",
                interval: "year",
                intervalcount: 1
            }
        ]
    };

    constructor(private userRepository: UserRepository) {
        super();
    }

    initialize() {
        this.context.user = this.userRepository.fetchUser();
    }

    viewProcedure(procedure: models.IService) {
        this.userRepository.storeUser(this.utils.extend({}, this.context.user, {
            selectedProcedure: procedure
        }));

        this.navigator.navigate(ProcedureViewControl, {
            parameters: {
                id: this.context.user.zip
            }
        });
    }
}

plat.register.viewControl('schedule-vc', ScheduleViewControl, [
    UserRepository
]);

export = ScheduleViewControl;
