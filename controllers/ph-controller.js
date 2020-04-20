const {ProductionHouse} = require('../models')

class ProductionHousesController {
    static showPh(req, res) {
        ProductionHouse.findAll({order: [['name_prodHouse', 'DESC']]})
        .then(data => {
            let pesan = req.query.pesan
            let id = req.params.id
            res.render("productionHouses.ejs", {data, pesan, id})
        })
        .catch(error => {
            res.send(error)
        })
    }

    static getAddForm(req, res) {
        let id = req.params.id
        let error = req.query.error
        res.render("add-productionHouses.ejs", {id, error})
    }

    static postAdd(req, res) {
        let np = false;
        let hq = false;
        // name_prodHouse: DataTypes.STRING,
        // headquarters: DataTypes.STRING  
        // Check & Validasi Production House Name
        if (req.body.name_prodHouse === '' || req.body.name_prodHouse === undefined) {
            res.redirect('/phouses/add?error=Nama PH harus diisi')
        } else {
            np = true
        }    
        
        // Check & Validasi Headquarters
        if (req.body.headquarters === '' || req.body.headquarters === undefined) {
            res.redirect('/phouses/add?error=Headquarter harus diisi')
        } else {
            hq = true
        } 
           
        // Check All validations
        if (np && hq) {
            let queryBody = req.body
            ProductionHouse.create({
                "name_prodHouse": queryBody.name_prodHouse,
                "headquarters": queryBody.headquarters,
            })
            .then(data => {
                res.redirect(`/phouses?pesan=berhasil menambahkan Productions House dengan nama ${queryBody.name_prodHouse}`)
            })
            .catch(err => {
                res.send(err)
            })
        }
    }

    static getEditForm(req, res) {
        let error = req.query.error;
        let id = req.params.id;
        ProductionHouse.findByPk(id)
        .then(data => {
            let dataPh = data.dataValues
            res.render("edit-productionHouses.ejs", {id, dataPh, error})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static postEdit(req, res) {
        let np = false;
        let hq = false;
        // name_prodHouse: DataTypes.STRING,
        // headquarters: DataTypes.STRING  
        // Check & Validasi Production House Name
        if (req.body.name_prodHouse === '' || req.body.name_prodHouse === undefined) {
            res.redirect(`/phouses/edit/${req.params.id}?error=Nama PH harus diisi`)
        } else {
            np = true
        }    
        
        // Check & Validasi Headquarters
        if (req.body.headquarters === '' || req.body.headquarters === undefined) {
            res.redirect(`/phouses/edit/${req.params.id}?error=Headquarter harus diisi`)
        } else {
            hq = true
        } 
           
        // Check All validations
        if (np && hq) {
            let queryBody = req.body;
            let id = req.params.id;
            ProductionHouse.update({
                "name_prodHouse": queryBody.name_prodHouse,
                "headquarters": queryBody.headquarters
            }, {returning: true, where: {id}})
            .then(data => {
                res.redirect(`/phouses?pesan=Berhasil edit data Production House dengan id: ${id}`)
            })
            .catch(err => {
                res.send(err)
            })
        }

    }

    static delete(req, res) {
        let id = req.params.id;
        ProductionHouse.destroy({where: {id}})
        .then(data => {
            res.redirect(`/phouses?pesan=berhasil delete data Production House dengan id ${id}`)
        })
        .catch(err => {
            res.send(err)
        })

    }

    static searchPhById(req, res) {
        ProductionHouse.findAll({order: [['name_prodHouse', 'DESC']]})
        .then(data => {
            let dataById = [];
            let queryBody = req.body.ph_by_id;
            let pesan = null;
            let check = false;
            for (let i in data) {
                if (data[i].id == queryBody) {
                    dataById.push(data[i]);
                    check = true;
                }
            }

            if (check == false) {
                pesan = "Maaf data PH dengan id " + queryBody + " tidak ada dalam database"
                res.render("productionHouse-by-id.ejs", {dataById, queryBody, pesan})
            } else {
                pesan = ''
                res.render("productionHouse-by-id.ejs", {dataById, queryBody, pesan})
            }
        })
        .catch(err => {
            res.send(err)
        })

    }
}

module.exports = ProductionHousesController