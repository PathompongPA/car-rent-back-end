const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const OFFER = sequelize.define("offers", {
    offerId: {
        type: DataTypes.UUID(),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4()
    },
    offerPrice: {
        type: DataTypes.INTEGER()
    },
    offerAmountDay: {
        type: DataTypes.INTEGER()
    }
})

module.exports = {
    OFFER
};
