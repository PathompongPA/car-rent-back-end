const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const CUSTOMER = sequelize.define("customers", {
    customerId: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    customerName: {
        type: DataTypes.STRING()
    },
    customerLastName: {
        type: DataTypes.STRING()
    },
    customerDriverLicense: {
        type: DataTypes.STRING()
    },
    customerIdCard: {
        type: DataTypes.STRING()
    },
    customerPhone: {
        type: DataTypes.STRING()
    },
    customerFacebook: {
        type: DataTypes.STRING()
    }
})

module.exports = {
    CUSTOMER
}