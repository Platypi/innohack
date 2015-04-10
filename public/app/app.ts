/// <reference path='../_references.d.ts' />
declare var StatusBar: { hide(): void; };
import plat = require('platypus');
import LoginViewControl = require('../viewcontrols/login/login.viewcontrol');
import ProfileViewControl = require('../viewcontrols/profile/profile.viewcontrol');

export class App extends plat.App {
    /**
     * Class for every app. This class contains hooks for Application Lifecycle Events
     * as well as error handling and device-events.
     */
    constructor(router: plat.routing.Router) {
        super();

        router.configure([
            { pattern: '', view: LoginViewControl },
            { pattern: 'profile', view: ProfileViewControl }
        ]);
    }

    /**
     * Event fired when the app is ready. This method can be used to 
     * configure various settings prior to loading the rest of the application
    **/
    ready(ev: plat.events.LifecycleEvent): void { 
        try {
            StatusBar.hide();
        } catch(e) { }
    }

    /**
     * Event fired when an internal error occurs.
     */
    error(ev: plat.events.ErrorEvent<Error>): void {
        // log or handle errors at a global level
        console.log(ev.error);
    }

    /**
     * Event fired when the app is suspended. If running on a device, 
     * this is where you want to save important data and finish ongoing processes.
     */
    suspend(ev: plat.events.LifecycleEvent): void { }

    /**
     * Event fired when the app has been programatically shutdown. This event is cancelable.
     */
    exiting(ev: plat.events.LifecycleEvent): void { }

    /**
     * Event fired when the app resumes from the suspended state. If running on a device,
     * this is where you want to re-initialize the app state. This is called only when the app was 
     * previously suspended.
     */
    resume(ev: plat.events.LifecycleEvent): void { }

    /**
     * Event fired when the device regains connectivity and is now in an online state.
     */
    online(ev: plat.events.LifecycleEvent): void { }

    /**
     * Event fired when the device loses connectivity and is now in an offline state.
    **/
    offline(ev: plat.events.LifecycleEvent): void { }
}

plat.register.app('Innohack', App, [
    plat.routing.Router
]);
