const express = require('express');
const app = express.Router();
const Catalogs = require('../../controllers/catalogs');
const Response = require('rapid-status');
const fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.get('/store/:storeID', async (req, res) => {

    
    let response;
    Catalogs.getCatalog(req.params.storeID)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch store catalog');
            res.status(response.status).jsonp(response);
    });


});

app.post('/:storeID', async (req, res) => {
    let response;
    
    

    const catalog = {
        storeID: req.params.storeID,
        product: req.body.product,
        price: req.body.price,
        abstract: req.body.abstract,
    }

    Catalogs.insertCatalog(catalog)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

app.post('/:catalogID/photo', upload.single('photo'), async (req, res) => {
    let response;
    
    let oldPath = __dirname + '/../../../' + req.file.path
    let newPath = __dirname + '/../../public/catalog/' + req.params.catalogID + req.file.originalname 

    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
    })

    const image = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        url: newPath
    }
    console.log(image)



    Catalogs.editCatalogPhoto(req.params.catalogID, image)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});


app.delete('/store/:storeID', async (req, res) => {

    
    let response;
    Catalogs.removeStoreCatalogs(req.params.storeID)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch store catalog');
            res.status(response.status).jsonp(response);
    });


});

app.delete('/:id', async (req, res) => {

    
    let response;
    Catalogs.removeCatalog(req.params.id)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch store catalog');
            res.status(response.status).jsonp(response);
    });


});


module.exports = app;