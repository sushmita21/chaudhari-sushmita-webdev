/**
 * Created by ch_su_000 on 01/06/2017.
 */
var app = require('../../express');
var pageModel = require('../model/page/page.model.server');

app.post("/api/website/:websiteId/page",createPage);
app.delete("/api/page/:pageId", deletePage);
app.get("/api/website/:websiteId/page",findPageByWebsiteId);
app.get("/api/page/:pageId",findPageById);
app.put("/api/page/:pageId",updatePage);


/*
 var pages = [
 { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
 { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
 { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
 ];
 */



function createPage(req, res){
    var newPage = req.body;
    var wid = req.params.websiteId;

    pageModel
        .createPage(wid, newPage)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404);
        });
    /*var len = pages.length;
     var lastId = pages[len - 1]._id;
     var newId = parseInt(lastId) + 1;
     var pid = newId.toString();
     var page = {
     _id: pid,
     name: newPage.name,
     websiteId: wid,
     description: newPage.description
     };
     pages.push(page);
     res.json(page);
     */
}

function deletePage(req, res){
    var pageId = req.params.pageId;
    pageModel
        .deletePage(pageId)
        .then(function (response) {
            if(response.result.n == 1 && response.result.ok == 1){
                res.sendStatus(200);
            }
            else{
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });

}
/*   for(var p in pages) {
 var page = pages[p];
 if( page._id === pageId) {
 pages.splice(p,1);
 res.sendStatus(200);
 return;
 }
 }
 res.sendStatus(404);
 }
 */
function findPageByWebsiteId(req, res){
    var wid = req.params.websiteId;
    pageModel
        .findPageByWebsiteId(wid)
        .then(function (pages) {
            res.json(pages);
        }, function (err) {
            res.sendStatus(404);
        });
    /*
     var pageList = [];
     for(var p in pages){
     if(pages[p].websiteId === wid){
     pageList.push(pages[p]);
     }
     }
     res.json(pageList);
     */
}

function findPageById(req, res){
    var pid = req.params.pageId;
    pageModel
        .findPageById(pid)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404);
        });

    /*
     var page = pages.find(function (p) {
     return p._id === pid;
     });
     res.json(page);
     */
}

function updatePage(req, res){
    var pid = req.params.pageId;
    var updatedPage = req.body;
    pageModel
        .updatePage(pid, updatedPage)
        .then(function (response) {
            if(response.ok === 1 && response.n === 1){
                res.sendStatus(200);
            }
            else{
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}