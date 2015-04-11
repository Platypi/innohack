/// <reference path="../../_references.d.ts" />

import plat = require('platypus');
import ParseLib = require('parse');
import BaseRepository = require('../../repositories/base/base.repository');
var Parse = ParseLib.Parse;

class ParseRepository extends BaseRepository { 
	public services: Array<models.IService> =[];
	public conditions: Array<models.ICondition> = [];
	private Condition: any;
	private Service: any;
	constructor(private Promise: plat.async.IPromise) {
		super();
		Parse.initialize("sewoswMeS3nxesYBdG6I9MVWT3xuwu2seEFdfLCF", "XbQpAHBK1LyaugnJejlvSjm7mJKdHZYpmgNfuwiT")
		this.Condition = Parse.Object.extend("Condition");
		this.Service = Parse.Object.extend("Service");
	}

	getConditions(): plat.async.IThenable<Array<models.ICondition>> {
		return new this.Promise<Array<models.ICondition>>((resolve, reject) => {
			if(this.conditions.length !== 0) {
				resolve(this.conditions);
				return;
			}
			
			var query = new Parse.Query(this.Condition);
			query.find({
				success: (conditions: any) => {
					for (var i = 0; i < conditions.length; ++i) {
						this.conditions.push({ 
							parseObject: conditions[i],
							name: conditions[i].get('name'),
							description: conditions[i].get('description')
						});
					}
					resolve(this.conditions);
				}
			});
		});
	}
	getServices(): plat.async.IThenable<Array<models.IService>> {
		return new this.Promise<Array<models.IService>>((resolve, reject) => {
			if(this.services.length !== 0) {
				resolve(this.services);
				return;
			}
			
			var query = new Parse.Query(this.Service);
			query.find({
				success: (services: any) => {
					for (var i = 0; i < services.length; ++i) {
						this.services.push({ 
							parseObject: services[i],
							name: services[i].get('name'),
							description: services[i].get('description'),
							interval: services[i].get('interval'),
							intervalcount: services[i].get('intervalcount')
						});
					}
					resolve(this.services);
				}
			});

		});
	}
	setReminder() {
		
	}
}

plat.register.injectable('parse', ParseRepository, 
	[
		plat.async.IPromise
	]
);

export = ParseRepository;
