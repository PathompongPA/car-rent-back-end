const services = require("../services")

async function Create(req, res) {
    try {
        res.success(await services.car.create(req))
    } catch (error) {
        res.fail(error.message)
    }
}

async function Read(req, res) {
    try {
        res.success(await services.car.read(req))
    } catch (error) {
        res.fail(error.message)
    }
}

async function Update(req, res) {
    // try {
    res.success(await services.car.update(req))
    // } catch (error) {
    //     res.fail(error.message)
    // }
}

async function Delete(req, res) {
    try {
        res.success(await services.car.delete(req))
    } catch (error) {
        res.fail(error.message)
    }
}

const car = {
    Create,
    Read,
    Update,
    Delete
}

module.exports = car
