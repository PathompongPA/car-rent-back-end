
const model = require("../model");
const utility = require("../utility");

let customer = {
    create: async (req) => {
        let { customerName, customerLastName, customerPhone } = { ...req.body };
        console.log(req.body)
        let { customerDriverLicense, customerIdCard, customerFacebook } = { ...req.files };
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
        return await model.CUSTOMER.create(customer).then((res) => {
            utility.file.saveFile(res.customerDriverLicense, customerDriverLicense)
            utility.file.saveFile(res.customerIdCard, customerIdCard)
            utility.file.saveFile(res.customerFacebook, customerFacebook)
            return res
        })
    },

    read: async (req) => {
        return await
            model.CUSTOMER.findAll({
                order: [["customerName", "ASC"]],
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            })
                .then((res) => {
                    const baseUrl = `http://${req.hostname}:9999/uploads/`;
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
        let isUpdateDriverLicense = customerDriverLicense !== undefined
        let isUpdateIdCard = customerIdCard !== undefined
        let isUpdateFacebook = customerFacebook !== undefined
        let customer = { customerName, customerLastName, customerPhone, }

        await model.CUSTOMER.findByPk(id).then(async (res) => {
            if (isUpdateDriverLicense) {
                let fileNameCustomerDriverLicense = await utility.file.genFileName(customerDriverLicense)
                customer.customerDriverLicense = fileNameCustomerDriverLicense[0]
                utility.file.deleteFile(res.customerDriverLicense)
                utility.file.saveFile(fileNameCustomerDriverLicense, customerDriverLicense)
            }

            if (isUpdateIdCard) {
                let fileNameCustomerIdCard = await utility.file.genFileName(customerIdCard)
                customer.customerIdCard = fileNameCustomerIdCard[0]
                utility.file.deleteFile(res.customerIdCard)
                utility.file.saveFile(fileNameCustomerIdCard, customerIdCard)
            }

            if (isUpdateFacebook) {
                let fileNameCustomerFacebook = await utility.file.genFileName(customerFacebook)
                customer.customerFacebook = fileNameCustomerFacebook[0]
                utility.file.deleteFile(res.customerFacebook)
                utility.file.saveFile(fileNameCustomerFacebook, customerFacebook)
            }
        })

        return await model.CUSTOMER.update(customer, { where: { id: id } })
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