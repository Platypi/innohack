/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseViewControl = require('../../viewcontrols/base/base.viewcontrol');

class ProfileViewControl extends BaseViewControl {
    templateString: string = require('./profile.viewcontrol.html');
    
    context = {
        currentStep: 0
    };

    // templates bind to
    templateTarget: plat.controls.INamedElement<HTMLDivElement, any>;

    // templates (in order of appearance!)
    templates = [
        {
            name: 'gender',
            template: require('./templates/gender.template.html'),
            selected: true
        },
        {
            name: 'dob',
            template: require('./templates/dob.template.html'),
            selected: false
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
