// controllers/serviceController.js
const Service = require('../database/models/serviceModel');

// List all services
exports.list = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.render('services/list', { services });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Show form to create a new service
exports.newForm = (req, res) => {
    res.render('services/new', { message: '' });
};

// Create a new service
exports.create = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        await Service.create({ name, description, price });
        res.redirect('/services');
    } catch (err) {
        res.status(500).render('services/new', { message: err.message });
    }
};

// Show form to edit a service
exports.editForm = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            res.status(404).send('Service not found');
            return;
        }
        res.render('services/edit', { service, message: '' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update a service
exports.update = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        await Service.updateById(req.params.id, { name, description, price });
        res.redirect('/services');
    } catch (err) {
        res.status(500).render('services/edit', { message: err.message });
    }
};

// Delete a service
exports.delete = async (req, res) => {
    try {
        await Service.deleteById(req.params.id);
        res.redirect('/services');
    } catch (err) {
        res.status(500).send(err.message);
    }
};
