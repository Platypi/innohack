/// <reference path="../../../_references.d.ts" />

import plat = require('platypus');

class Facebook {
    private facebook: window.CC.CordovaFacebook;
    constructor(private utils: plat.Utils, private Promise: plat.async.IPromise, private compat: plat.Compat) {
        if (utils.isObject(window.CC) && utils.isFunction(window.CC.CordovaFacebook)) {
            this.facebook = new window.CC.CordovaFacebook();
        } else {
            this.facebook = {
                init: (id: string, name: string, permissions: Array<string>, success: (response: window.CC.IResponse) => void, fail: (err: string) => void): void => {
                    success({
                        accessToken: 'token',
                        expirationDate: new Date(),
                        permissions: permissions
                    });
                },
                login: (success: (response: window.CC.IResponse) => void, fail: (err: string) => void): void => {
                    success({
                        accessToken: 'token',
                        expirationDate: new Date(),
                        permissions: []
                    });
                },
                logout: (done: () => void): void => {
                    done();
                },
                info: (success: (user: window.CC.IUser) => void, fail: (err: string) => void): void => {
                    success({
                        id: '234234234',
                        name: 'John Doe',
                        email: 'john@doe.com',
                        first_name: 'John',
                        last_name: 'Doe',
                        link: 'https://facebook.com/johndoe',
                        locale: 'en'
                    });
                },
                share: (name: string, url: string, logoUrl: string, caption: string, description: string, success: (post_id?: string) => void, fail: (err: string) => void): void => {
                    console.log(`
                        Sharing on Facebook
                        name: ${name}
                        url: ${url}
                        logoUrl: ${logoUrl}
                        caption: ${caption}
                        description: ${description}
                    `);
                    success();
                },
                feed: (name: string, url: string, logoUrl: string, caption: string, description: string, success: (post_id?: string) => void, fail: (err: string) => void): void => {
                    success();
                },
                postScore: (score: number, success: () => void, fail: (err: string) => void): void => {
                    success();
                },
                getScores: (success: (scores: Array<window.CC.IScore>) => void, fail: (err: string) => void): void => {
                    success([
                        { score: 15, user: { id: '123', name: 'Jane Doe' } },
                        { score: 12, user: { id: '123', name: 'Jack Doe' } },
                        { score: 13, user: { id: '123', name: 'Jeff Doe' } },
                        { score: 8, user: { id: '123', name: 'Jake Doe' } },
                        { score: 4, user: { id: '123', name: 'Jess Doe' } }
                    ]);
                }
            };
        }
    }

    init(id: number|string, name: string, permissions: Array<string>) {
        return new this.Promise<window.CC.IResponse>((resolve, reject) => {
            this.facebook.init(String(id), name, permissions, resolve, reject);
        });
    }

    login() {
        return new this.Promise<any>((resolve, reject) => {
            return this.facebook.info((user) => {
                if (!this.utils.isObject(user)) {
                    return this.facebook.login(resolve, reject);
                }
                resolve(user);
            },(err) => {
                this.facebook.login(resolve, reject);
            });
        });
    }

    post(name: string, url: string, logoUrl: string, caption: string, description: string) {
        var android = !this.utils.isUndefined(this.compat.ANDROID);

        return new this.Promise<string>((resolve, reject) => {
            this.facebook.share(
                name,
                url,
                logoUrl,
                caption,
                description,
                resolve, 
                reject);
        });
    }
}

/**
 * This is how you register an injectable with the framework.
 * Injectables can have dependencies too!
 */
plat.register.injectable('facebook', Facebook, [
    plat.Utils,
    plat.async.IPromise,
    plat.Compat
]);

export = Facebook;

declare module window {
    module CC {
        class CordovaFacebook {
            init(id: string, name: string, permissions: Array<string>, success: (response: IResponse) => void, fail: (err: string) => void): void;
            login(success: (response: IResponse) => void, fail: (err: string) => void): void;
            logout(done: () => void): void;
            info(success: (user: IUser) => void, fail: (err: string) => void): void;
            share(name: string, url: string, logoUrl: string, caption: string, description: string, success: (post_id?: string) => void, fail: (err: string) => void): void;
            feed(name: string, url: string, logoUrl: string, caption: string, description: string, success: (post_id?: string) => void, fail: (err: string) => void): void;
            postScore(score: number, success: () => void, fail: (err: string) => void): void;
            getScores(success: (scores: Array<IScore>) => void, fail: (err: string) => void): void;
        }

        interface IResponse {
            accessToken: string;
            expirationDate: Date;
            permissions: Array<any>;
        }

        interface IUser {
            id: string;
            name: string;
            email?: string;
            first_name: string;
            last_name: string;
            link: string;
            locale: string;
        }

        interface IScore {
            score: number;
            user: {
                id: string; name: string;
            };
        }
    }
}
