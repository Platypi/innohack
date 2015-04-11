/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseRepository = require('../../repositories/base/base.repository');

class UserRepository extends BaseRepository { 
    private user: any = null;

    storeUser(user: any): void {
        this.user = user;
    }

    fetchUser(): any {
        return this.user;
    }
}

plat.register.injectable('user-repo', UserRepository, []);

export = UserRepository;
