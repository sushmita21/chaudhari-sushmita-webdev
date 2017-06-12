/**
 * Created by ch_su_000 on 01/06/2017.
 */
var app =require('../../express');
var websiteModel = require('../model/website/website.model.server');
app.get("/api/user/:userId/website",findWebsitesByUser);
app.get("/api/website/:websiteId",findWebsiteById);
app.post("/api/user/:userId/website",createWebsite);
app.put("/api/website/:websiteId",updateWebsite);
app.delete("/api/website/:websiteId",deleteWebsite);


function findWebsitesByUser(req, res)
{
    var userId = req.params.userId;
    /*var websiteList = [];
     for(var w in websites)
     {
     if(websites[w].developerId === userId)
     {
     websiteList.push(websites[w]);
     }
     }
     res.json(websiteList);
     */
    websiteModel
        .findWebsitesByUser(userId)
        .then(function (response) {
            res.json(response);
        },function (err) {
            res.sendStatus(404);
        });

}

function findWebsiteById(req, res)
{
    var websiteId = req.params.websiteId;
    /*for(var w in websites)
     {
     if(websites[w]._id === websiteId)
     {
     res.send(websites[w]);
     return;
     }
     }
     res.sendStatus(404);
     */

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.sendStatus(404);
        });
}

function createWebsite(req, res)
{
    var userId = req.params.userId;
    var newWebsite = req.body;

    /*var length =websites.length -1;
     var lastWebsiteId = websites[length]._id;
     var wid = parseInt(lastWebsiteId) + 1;
     var newWebsite = {
     _id: wid.toString(),
     name: newWebsite.name,
     developerId: userId,
     description: newWebsite.description
     };
     websites.push(newWebsite);
     res.json(newWebsite);
     */
    websiteModel
        .createWebsiteForUser(userId, newWebsite)
        .then(function (website) {
            res.json(website);
        },function (err) {
            res.sendStatus(404);
        });
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var updatedWebsite = req.body;
    /*for(var w in websites)
     {
     if(websites[w]._id === websiteId)
     {
     websites[w].name = updateWebsite.name;
     websites[w].description = updateWebsite.description;
     res.json(websites[w]);
     }
     }*/
    websiteModel
        .updateWebsite(websiteId, updatedWebsite)
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

function deleteWebsite(req, res)
{
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(websiteId)
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

    /*
     for(var w in websites) {
     if(websites[w]._id === websiteId){
     websites.splice(w ,1);
     res.sendStatus(200);
     return ;
     }
     */


    //res.sendStatus(404);
}