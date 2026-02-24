const { DataTypes } = require("sequelize");
const { sequelize } = require("./init.model");

const CONTENT = sequelize.define("contents", {
    id: {
        type: DataTypes.STRING(),
        primaryKey: true,
    },
    value: {
        type: DataTypes.TEXT("long"),
        // get() {
        //     const raw = this.getDataValue('value');
        //     try {
        //         return JSON.parse(raw);
        //     } catch (e) {
        //         return raw;
        //     }
        // },
        // set(val) {
        //     this.setDataValue('value', JSON.stringify(val));
        // }
    }
})

module.exports = {
    CONTENT
}
