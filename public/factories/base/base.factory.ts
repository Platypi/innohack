/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

class BaseFactory {
    protected static _inject: any = {
        _utils: plat.Utils
    };

    protected _utils: plat.Utils;

}

export = BaseFactory;
