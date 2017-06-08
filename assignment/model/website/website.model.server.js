/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server')
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);



websiteModel.findWebsiteById= findWebsiteById;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;



modules.export = websiteModel;