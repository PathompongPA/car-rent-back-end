require('dotenv');
const model = require("../model");
const utility = require("../utility");
const { saveFile, genFileName, deleteFile } = require('../utility/saveFile');

let customer = {
    create: async (req) => {
        let { customerName, customerLastName, customerPhone } = { ...req.body };
        let { customerDriverLicense, customerIdCard, customerFacebook } = { ...req.files };
        console.log("file receiver : ", { ...req.files });
        let fileNameCustomerIdCard = await utility.file.genFileName(customerIdCard)
        let fileNameCustomerDriverLicense = await utility.file.genFileName(customerDriverLicense)
        let fileNameCustomerFacebook = await utility.file.genFileName(customerFacebook)
        let customer = {
            customerName,
            customerLastName,
            customerPhone,
            customerIdCard: fileNameCustomerIdCard[0],
            customerDriverLicense: fileNameCustomerDriverLicense[0],
            customerFacebook: fileNameCustomerFacebook[0]
        }
        return await model.CUSTOMER.create(customer).then((result) => {
            utility.file.saveFile(result.customerDriverLicense, customerDriverLicense)
            utility.file.saveFile(result.customerIdCard, customerIdCard)
            utility.file.saveFile(result.customerFacebook, customerFacebook)
            return result
        })
    },

    /**
     * 
     * @param {import('express').Request} req 
     * @returns 
     */
    read: async (req) => {
        return await
            model.CUSTOMER.findAll({
                order: [["customerName", "ASC"]],
                // attributes: { exclude: ['createdAt', 'updatedAt'] },
            })
                .then((res) => {
                    let protocol = req.hostname === "www.carrent88.com" ? "https" : "http"
                    const baseUrl = `${protocol}://${req.hostname}/uploads/`;
                    return res.map((item) => {
                        const plainItem = item.get({ plain: true });
                        return {
                            ...plainItem,
                            customerDriverLicense: baseUrl + JSON.parse(JSON.stringify(item.customerDriverLicense)),
                            customerIdCard: baseUrl + JSON.parse(JSON.stringify(item.customerIdCard)),
                            customerFacebook: baseUrl + JSON.parse(JSON.stringify(item.customerFacebook)),
                        }
                    })
                }
                )
    },

    update: async (req) => {
        let { id, customerName, customerLastName, customerPhone } = { ...req.body };
        let { customerDriverLicense, customerIdCard, customerFacebook } = { ...req.files };
        let customer = { customerName, customerLastName, customerPhone }
        console.log("customer : ", customer);

        if (!id) throw new Error("customer id is required")

        if (customerIdCard) {
            console.log("have id card.");
            let fileName = await genFileName(customerIdCard);
            saveFile(fileName, customerIdCard)
            let oldRecord = await model.CUSTOMER.findByPk(id)
            oldRecord.customerIdCard && deleteFile(oldRecord.customerIdCard)
            customer.customerIdCard = fileName[0]
        }

        if (customerDriverLicense) {
            console.log("have driver license.");
            let fileName = await genFileName(customerDriverLicense);
            saveFile(fileName, customerDriverLicense)
            let oldRecord = await model.CUSTOMER.findByPk(id)
            oldRecord.customerDriverLicense && deleteFile(oldRecord.customerDriverLicense)
            customer.customerDriverLicense = fileName[0]
        }

        if (customerFacebook) {
            console.log("have facebook.");
            let fileName = await genFileName(customerFacebook);
            saveFile(fileName, customerFacebook)
            let oldRecord = await model.CUSTOMER.findByPk(id)
            oldRecord.customerFacebook && deleteFile(oldRecord.customerFacebook)
            customer.customerFacebook = fileName[0]
        }

        await model.CUSTOMER.update(customer, { where: { id: id } })
    },

    updateIdCard: async (req) => {
        let { id } = { ...req.body };
        const { idCard } = { ...req.files };
        if (!id) throw new Error("customer id is required")

        let fileNameCustomerIdCard = await utility.file.genFileName(idCard)
        utility.file.saveFile(fileNameCustomerIdCard, idCard)

        await model.CUSTOMER.update(
            { customerIdCard: fileNameCustomerIdCard[0] },
            {
                where:
                    { id: id }
            })
    },

    delete: async (req) => {
        await model.CUSTOMER.findOne({ where: req.body }).then((res) => {
            utility.file.deleteFile(res.customerDriverLicense)
            utility.file.deleteFile(res.customerIdCard)
            utility.file.deleteFile(res.customerFacebook)
        })
        await model.CUSTOMER.destroy({ where: req.body })
    },
}

module.exports = customer