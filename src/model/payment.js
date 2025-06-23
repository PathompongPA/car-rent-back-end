const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const PAYMENT = sequelize.define("payments", {
    paymentId: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    date: {
        type: DataTypes.DATE()
    },
    slip: {
        type: DataTypes.STRING()
    },
    amount: {
        type: DataTypes.INTEGER()
    },
    receiver: {
        type: DataTypes.STRING()
    }
})

module.exports = {
    PAYMENT
}