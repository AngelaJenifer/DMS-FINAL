const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const SignupModel = require('./models/SignupModel')
const CompanyModel = require('./models/CompanyModel');
const TruckModel = require('./models/TruckModel');
const CurrencyModel = require('./models/CurrencyModel');
const DockModel = require('./models/DockModel');
const CommodityModel = require('./models/CommodityModel');
const LocationModel = require('./models/LocationModel');
const TenantModel = require('./models/TenantModel');
const TransporterModel = require('./models/TransporterModel');
const dotenv = require('dotenv')

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);



app.post('/signup', (req, res) => {

SignupModel.findOne({ userid:req.body.userid })
.then(existingUser => {
    if (existingUser){
        res.status(400).json({ error: 'User already exists' })
    }
    else{
        SignupModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error : 'could not create user' }))
    }
})
.catch(err => res.status(500).json({ error : 'server error' }))
    
})

app.post('/login', (req, res) => {
    const {userid, password} = req.body;
    SignupModel.findOne({userid: userid})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }else {
                res.json({ status : "Error" , message : "Password is incorrect"})
            }
        }else {
            res.json({ status : "Error" , message : "userid does not exist"})
        }
    })
    .catch(err => res.status(500).json({ status : "Error" , message : "server error"}))
})

//company crud starting
// Fetch companies
app.get('/companies', async (req, res) => {
    try {
        const companies = await CompanyModel.find();
        res.json({ success: true, data: companies });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//create data // save data in mongo //install rapid api in extension
//"http://localhost:8080/create" {name,emai,mobile}
app.post('/create', async (req, res) => {
    try {
        const company = new CompanyModel(req.body);
        await company.save();
        res.json({ success: true, message: 'Company created successfully' });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//update
//"http://localhost:8080/update" {id,name,emai,mobile}

app.put('/update', async (req, res) => {
    try {
        const company = await CompanyModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json({ success: true, message: 'Company updated successfully', data: company });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//delete
//"http://localhost:8080/delete/id" 

app.delete('/delete/:id', async (req, res) => {
    try {
        await CompanyModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Company deleted successfully' });
    } catch (err) {
        console.error("Error deleting company:", err.message);
        res.json({ success: false, message: err.message });
    }
});

//company crud ending


//truck list crud starting
// Fetch trucklist
app.get('/trucks', async (req, res) => {
    try {
        const companies = await TruckModel.find();
        res.json({ success: true, data: companies });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//create data // save data in mongo //install rapid api in extension
//"http://localhost:8080/create" {name,emai,mobile}
app.post('/createtruck', async (req, res) => {
    try {
        const company = new TruckModel(req.body);
        await company.save();
        res.json({ success: true, message: 'Company created successfully' });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//update
//"http://localhost:8080/update" {id,name,emai,mobile}

app.put('/updatetruck', async (req, res) => {
    try {
        const company = await TruckModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json({ success: true, message: 'Company updated successfully', data: company });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//delete
//"http://localhost:8080/delete/id" 

app.delete('/deletetruck/:id', async (req, res) => {
    try {
        await TruckModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Company deleted successfully' });
    } catch (err) {
        console.error("Error deleting company:", err.message);
        res.json({ success: false, message: err.message });
    }
});

// truck list crud ending


//currency crud starting
// Fetch currency
app.get('/currency', async (req, res) => {
    try {
        const companies = await CurrencyModel.find();
        res.json({ success: true, data: companies });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//create data // save data in mongo //install rapid api in extension
//"http://localhost:8080/create" {name,emai,mobile}
app.post('/createcurrency', async (req, res) => {
    try {
        const company = new CurrencyModel(req.body);
        await company.save();
        res.json({ success: true, message: 'Company created successfully' });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//update
//"http://localhost:8080/update" {id,name,emai,mobile}

app.put('/updatecurrency', async (req, res) => {
    try {
        const company = await CurrencyModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json({ success: true, message: 'Company updated successfully', data: company });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//delete
//"http://localhost:8080/delete/id" 

app.delete('/deletecurrency/:id', async (req, res) => {
    try {
        await CurrencyModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Company deleted successfully' });
    } catch (err) {
        console.error("Error deleting company:", err.message);
        res.json({ success: false, message: err.message });
    }
});

// currency list crud ending

//dock crud starting
// Fetch dock
app.get('/dock', async (req, res) => {
    try {
        const companies = await DockModel.find();
        res.json({ success: true, data: companies });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//create data // save data in mongo //install rapid api in extension
//"http://localhost:8080/create" {name,emai,mobile}
app.post('/createdock', async (req, res) => {
    try {
        const company = new DockModel(req.body);
        await company.save();
        res.json({ success: true, message: 'Dock created successfully' });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//update
//"http://localhost:8080/update" {id,name,emai,mobile}

app.put('/updatedock', async (req, res) => {
    try {
        const company = await DockModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json({ success: true, message: 'Dock updated successfully', data: company });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//delete
//"http://localhost:8080/delete/id" 

app.delete('/deletedock/:id', async (req, res) => {
    try {
        await DockModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'dock deleted successfully' });
    } catch (err) {
        console.error("Error deleting company:", err.message);
        res.json({ success: false, message: err.message });
    }
});

// dock list crud ending

//commodity crud starting
// Fetch currency
app.get('/commodity', async (req, res) => {
    try {
        const companies = await CommodityModel.find();
        res.json({ success: true, data: companies });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//create data // save data in mongo //install rapid api in extension
//"http://localhost:8080/create" {name,emai,mobile}
app.post('/createcommodity', async (req, res) => {
    try {
        const company = new CommodityModel(req.body);
        await company.save();
        res.json({ success: true, message: 'Commodity created successfully' });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//update
//"http://localhost:8080/update" {id,name,emai,mobile}

app.put('/updatecommodity', async (req, res) => {
    try {
        const company = await CommodityModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json({ success: true, message: 'Commodity updated successfully', data: company });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//delete
//"http://localhost:8080/delete/id" 

app.delete('/deletecommodity/:id', async (req, res) => {
    try {
        await CommodityModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Commodity deleted successfully' });
    } catch (err) {
        console.error("Error deleting company:", err.message);
        res.json({ success: false, message: err.message });
    }
});

// commodity list crud ending

//Location crud starting
// Fetch location
app.get('/location', async (req, res) => {
    try {
        const companies = await LocationModel.find();
        res.json({ success: true, data: companies });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//create data // save data in mongo //install rapid api in extension
//"http://localhost:8080/create" {name,emai,mobile}
app.post('/createlocation', async (req, res) => {
    try {
        const company = new LocationModel(req.body);
        await company.save();
        res.json({ success: true, message: 'Location created successfully' });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//update
//"http://localhost:8080/update" {id,name,emai,mobile}

app.put('/updatelocation', async (req, res) => {
    try {
        const company = await LocationModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json({ success: true, message: 'Location updated successfully', data: company });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//delete
//"http://localhost:8080/delete/id" 

app.delete('/deletelocation/:id', async (req, res) => {
    try {
        await LocationModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Location deleted successfully' });
    } catch (err) {
        console.error("Error deleting company:", err.message);
        res.json({ success: false, message: err.message });
    }
});

// commodity list crud ending

//Tenant crud starting
// Fetch location
app.get('/tenant', async (req, res) => {
    try {
        const companies = await TenantModel.find();
        res.json({ success: true, data: companies });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//create data // save data in mongo //install rapid api in extension
//"http://localhost:8080/create" {name,emai,mobile}
app.post('/createtenant', async (req, res) => {
    try {
        const company = new TenantModel(req.body);
        await company.save();
        res.json({ success: true, message: 'Tenant created successfully' });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//update
//"http://localhost:8080/update" {id,name,emai,mobile}

app.put('/updatetenant', async (req, res) => {
    try {
        const company = await TenantModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json({ success: true, message: 'Location updated successfully', data: company });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//delete
//"http://localhost:8080/delete/id" 

app.delete('/deletetenant/:id', async (req, res) => {
    try {
        await TenantModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Tenant deleted successfully' });
    } catch (err) {
        console.error("Error deleting Tenant:", err.message);
        res.json({ success: false, message: err.message });
    }
});

// tenant list crud ending

//transporter crud starting
// Fetch location
app.get('/transporter', async (req, res) => {
    try {
        const companies = await TransporterModel.find();
        res.json({ success: true, data: companies });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//create data // save data in mongo //install rapid api in extension
//"http://localhost:8080/create" {name,emai,mobile}
app.post('/createtransporter', async (req, res) => {
    try {
        const company = new TransporterModel(req.body);
        await company.save();
        res.json({ success: true, message: 'transporter created successfully' });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//update
//"http://localhost:8080/update" {id,name,emai,mobile}

app.put('/updatetransporter', async (req, res) => {
    try {
        const company = await TransporterModel.findByIdAndUpdate(req.body._id, req.body, { new: true });
        res.json({ success: true, message: 'transporter updated successfully', data: company });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

//delete
//"http://localhost:8080/delete/id" 

app.delete('/deletetransporter/:id', async (req, res) => {
    try {
        await TransporterModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'transporter deleted successfully' });
    } catch (err) {
        console.error("Error deleting Tenant:", err.message);
        res.json({ success: false, message: err.message });
    }
});

// transporter list crud ending


app.listen(process.env.PORT, () => {
    console.log('Server is running')
})