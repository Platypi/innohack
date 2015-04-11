/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

import BaseRepository = require('../base/base.repository');
import Service = require('../../services/factual/factual.service');

class FactualRepository extends BaseRepository {
    constructor(private service: Service) {
        super();
    }

    all(filter: config.IFilter) {
        return this.service.all(filter);
    }

    one(id: string) {
        return this.service.one(id);
    }
}

plat.register.injectable('factual-repo', FactualRepository, [
    Service
]);

export = FactualRepository;
