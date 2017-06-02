/**
 * Created by ch_su_000 on 01/06/2017.
 */
var app =require('../../express');
var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

app.get("/api/user/:userId/website",findWebsitesByUser);
app.get("/api/website/:websiteId",findWebsiteById);

app.post("/api/user/:userId/website",createWebsite);
app.put("/api/website/:websiteId",updateWebsite);
app.delete("/api/website/:websiteId",deleteWebsite);

function findWebsitesByUser(req, res)
{
        var userId = req.params.userId;
        var websiteList = [];
        for(var w in websites)
        {
                if(website[w].developerId === userId)
                {
                        websiteList.push(w);
                }
        }
        res.json(websiteList);
}

function findWebsiteById(req, res)
{
        var websiteId = req.params.websiteId;
        for(var w in websites)
        {
                if(website[w]._id === websiteId)
                {
                        return website[w];
                }
        }
        res.json(website[w]);
}
function createWebsite(req, res)
{
    var userId = req.params.userId;
    var newWebsite = req.body;

    var length =websites.length -1;
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
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var updateWebsite = req.body;
    for(var w in websites)
    {
        if(websites[w]._id === websiteId)
        {
                websites[w].name === updateWebsite.name;
                websites[w].description === updateWebsite.description;
                res.json(website[w]);
        }
    }
}

function deleteWebsite(req, res)
{
    for(var w in websites) {

        if(websites[w]._id === websiteId){
            websites.splice(w ,1);
            res.json(website[w]);
            return ;
        }

    }
    return "WebsiteNotFound";

}