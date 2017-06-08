/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server')
var pageModel = mongoose.model('pageModel', pageSchema);
modules.export = pageModel;

pageModel.createPage= createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
