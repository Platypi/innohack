/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
import BaseViewControl = require('../../viewcontrols/base/base.viewcontrol');
import ScheduleViewControl = require('../../viewcontrols/schedule/schedule.viewcontrol');
import ParseRepository = require('../../repositories/parse/parse.repository');
import UserRepository = require('../../repositories/user/user.repository');
import InsuranceService = require('../../services/local/local.service');

var moment = require('moment');

class ProfileViewControl extends BaseViewControl {
    templateString: string = require('./profile.viewcontrol.html');
    
    context = {
        currentStep: 0,
        user: {
            gender: <string>null,
            zipCode: <string>null,
            dob: moment(),
            insurance: {
                health: '',
                dental: '',
                vision: ''
            },
            conditions: <Array<models.ICondition>>[],
            medications: <Array<any>>[]
        },
        currentMed: {
            amount: 0,
            name: '',
            time: {
                hours: '',
                minutes: '',
                meridiem: ''
            }
        },
        currentCondition: <models.ICondition>null,
        gender: <string>null,
        conditions: <Array<models.ICondition>>[],
        services: <Array<models.IService>>[],
        insurance: <Array<string>>[],
        months: [
            { name: 'January', value: 0 },
            { name: 'February', value: 1 },
            { name: 'March', value: 2 },
            { name: 'April', value: 3 },
            { name: 'May', value: 4 },
            { name: 'June', value: 5 },
            { name: 'July', value: 6 },
            { name: 'August', value: 7 },
            { name: 'September', value: 8 },
            { name: 'October', value: 9 },
            { name: 'November', value: 10 },
            { name: 'December', value: 11 },
        ],
        hours: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        minutes: ['00', '15', '30'],
        meridiem: ['AM', 'PM'],
        years: <Array<number>>[],
        days: <Array<number>>[],
        dob: moment()
    };

    // templates bind to
    templateTarget: plat.controls.INamedElement<HTMLDivElement, any>;

    // templates (in order of appearance!)
    templates = [
        {
            name: 'gender',
            template: require('./templates/gender.template.html'),
        },
        {
            name: 'dob',
            template: require('./templates/dob.template.html'),
        },
        {
            name: 'zip',
            template: require('./templates/zip.template.html'),
        },
        {
            name: 'insurance',
            template: require('./templates/insurance.template.html'),
        },
        {
            name: 'conditions',
            template: require('./templates/conditions.template.html'),
        },
        {
            name: 'medications',
            template: require('./templates/medications.template.html')
        }
    ];

    constructor(private parse: ParseRepository,
        private userRepository: UserRepository,
        private insurance: InsuranceService) {
        super();
    }

    initialize() {
        var context = this.context;

        this.setYearContext();
        this.parse.getConditions().then((conditions) => {
            context.conditions = conditions;
        });
        this.parse.getServices().then((services) => {
            context.services = services;
        });
        this.insurance.getInsuranceProviders().then((result) => {
            result.response.providers.sort();
            context.insurance = result.response.providers;
        });
    }

    setGender(gender: string) {
        this.context.gender = gender;
    }

    fetchTemplates() {
        var serialize = this.dom.serializeHtml;
        
        this.utils.forEach((template) => {
            this.bindableTemplates.add(template.name, serialize(template.template));
        }, this.templates);
    }

    loaded() {
        this.fetchTemplates();
        this.setStep(this.templates[this.context.currentStep]);
    }

    setStep(step: any) {
        var el = this.templateTarget.element;

        this.bindableTemplates.bind(step.name).then((template) => {
            this.dom.clearNode(el);
            this.insertTemplate(template, el);
        });
    }

    goForward() {
        this.setStep(this.templates[++this.context.currentStep]);
    }

    goBack() {
        this.setStep(this.templates[--this.context.currentStep]);
    }

    insertTemplate(template: DocumentFragment, el: Element) {
        this.dom.insertBefore(el, template);
    }

    setYearContext() {
        var context = this.context;
        var dob = context.user.dob;
        var currentYear = dob.year();
        var baseYear = currentYear - 100;
        var i = 0;

        while(currentYear >= baseYear) {
            context.years.push(baseYear);
            baseYear++;
        }
    }

    setDayContext(month: number) {
        var context = this.context;
        var dob = context.user.dob;
        var lastDay = dob.endOf('month').date();
        var firstDay = 1;

        context.days = [];

        while(lastDay >= firstDay) {
            context.days.push(firstDay);
            firstDay++;
        }
    }

    monthChosen(ev: any) {
        var month = ev.target.selectedOptions[0].index - 1;
        this.context.user.dob.month(month);
        this.setDayContext(month);
    }

    addMedication() {
        var context = this.context;

        context.user.medications.push(this.utils.clone(context.currentMed, true));
        context.currentMed = this.utils.clone({
            amount: 0,
            name: '',
            time: {
                hours: '',
                minutes: '',
                meridiem: ''
            }
        }, true);
    }

    deleteMedication(index: number) {
        this.context.user.medications.splice(index, 1);
    }

    setMedTime(type: string, ev: any) {
        (<any>this.context.currentMed).time[type] = ev.target.selectedOptions[0].value;
    }

    yearChosen(ev: any) {
        this.context.user.dob.year(ev.target.selectedOptions[0].value);
    }

    dayChosen(ev: any) {
        this.context.user.dob.date(ev.target.selectedOptions[0].value);
    }

    setInsurance(type: string, ev: any) {
        var insurance: any = this.context.user.insurance;
        insurance[type] = ev.target.selectedOptions[0].value;
    }

    addCondition() {
        var context = this.context;

        this.context.user.conditions.push(context.currentCondition);
        context.currentCondition = null;
    }

    setCondition(ev: any) {
        this.context.currentCondition = JSON.parse(ev.target.selectedOptions[0].value);
    }

    deleteCondition(index: number) {
        this.context.user.conditions.splice(index, 1);
    }

    submit() {
        this.userRepository.storeUser(this.context.user);
        this.navigator.navigate(ScheduleViewControl);
    }
}

plat.register.viewControl('profile-vc', ProfileViewControl, [
    ParseRepository,
    UserRepository,
    InsuranceService
]);

export = ProfileViewControl;
