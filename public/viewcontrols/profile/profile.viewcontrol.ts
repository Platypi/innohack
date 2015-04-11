/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseViewControl = require('../../viewcontrols/base/base.viewcontrol');

class ProfileViewControl extends BaseViewControl {
    templateString: string = require('./profile.viewcontrol.html');
    
    context = {
        currentStep: 0,
        gender: <string>null,
        dob: {
            month: <number>null,
            date: <number>null,
            year: <number>null
        },
        months: [
            { name: 'January', value: 1 },
            { name: 'February', value: 2 },
            { name: 'March', value: 3 },
            { name: 'April', value: 4 },
            { name: 'May', value: 5 },
            { name: 'June', value: 6 },
            { name: 'July', value: 7 },
            { name: 'August', value: 8 },
            { name: 'September', value: 9 },
            { name: 'October', value: 10 },
            { name: 'November', value: 11 },
            { name: 'December', value: 12 },
        ]
    };

    // templates bind to
    templateTarget: plat.controls.INamedElement<HTMLDivElement, any>;

    // order: gender, dob, zip, insurance, meds, conditions

    // templates (in order of appearance!)
    templates = [
        {
            name: 'dob',
            template: require('./templates/dob.template.html'),
            selected: false
        },
        {
            name: 'gender',
            template: require('./templates/gender.template.html'),
            selected: true
        },
        {
            name: 'zip',
            template: require('./templates/zip.template.html'),
            selected: false
        },
        {
            name: 'insurance',
            template: require('./templates/insurance.template.html'),
            selected: false
        },
        {
            name: 'medications',
            template: require('./templates/medications.template.html'),
            selected: false
        },
        {
            name: 'conditions',
            template: require('./templates/conditions.template.html'),
            selected: false
        }
    ];

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
}

plat.register.viewControl('profile-vc', ProfileViewControl);

export = ProfileViewControl;
