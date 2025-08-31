require('dotenv');
const { Op } = require('sequelize');
const model = require("../model");
const utility = require("../utility");
const dayjs = require('dayjs');

let car = {

    create: async (req) => {
        let { carName, brandId, carDescription, offer } = { ...req.body };

        let { carImage, carThumbnail } = req.files;

        let fileThumbnail = carThumbnail
        console.log("car Image : ", carImage)
        carThumbnail = await utility.file.genFileName(carThumbnail)
        utility.file.saveFile(carThumbnail, fileThumbnail)
        let car = { carName, brandId, carDescription, carThumbnail: carThumbnail[0] }
        return await
            model.CAR.create(car)
                .then(
                    async (_res) => {
                        let carId = _res.id
                        let images = await utility.file.genFileName(carImage)
                        let arrImage = mapForeignKeyImage(images, carId)
                        let arrOffer = mapForeignKeyOffer(JSON.parse(offer), carId)
                        await model.IMG.bulkCreate(arrImage)
                        await model.OFFER.bulkCreate(arrOffer)
                        utility.file.saveFile(images, carImage)
                    })
    },

    read: async (req) => {
        let car = await model.CAR.findAll({
            order: [["carName", "ASC"]],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
                {
                    model: model.IMG,
                    attributes: ["name"],
                    separate: true,
                    order: [["index", "ASC"]]
                },
                {
                    model: model.OFFER,
                    attributes: ["id", "offerPrice", "offerAmountDay"],
                    where: { isDelete: false },
                    separate: true,
                    order: [["offerAmountDay", "ASC"]]
                },
                {
                    model: model.BRAND,
                },
                {
                    model: model.BOOKING,
                    where: { isDelete: false },
                    separate: true,
                    attributes: ["checkInDate", "checkOutDate"]
                }
            ]
        })
            .then((res) => {
                const baseUrl = `${req.protocol}://${req.hostname}/uploads/`;
                let isEmpty = res.length === 0
                return isEmpty ? [] : res.map((item) => {
                    const plainItem = item.get({ plain: true });
                    return {
                        ...plainItem,
                        carThumbnail: baseUrl + item.carThumbnail,
                        Imgs: item.Imgs.map((res) => {
                            return baseUrl + res.name
                            // return {
                            //     "url": baseUrl + res.name,
                            //     "index": res.index
                            // }
                        }

                        ),
                    };
                });
            });

        car.forEach(
            (res) => {
                let arrayBooking = [];
                res.bookings.forEach(({ checkInDate, checkOutDate }) => {
                    const checkIn = dayjs(checkInDate);
                    const checkOut = dayjs(checkOutDate);
                    let day = checkIn;
                    while (day.isBefore(checkOut) || day.isSame(checkOut)) {
                        arrayBooking.push(day.format("YYYY-MM-DD"));
                        day = day.add(1, "day");
                    }
                });
                res.bookedDates = arrayBooking;
                res.Imgs.sort((a, b) => a.index - b.index);
            });
        return car;
    },

    Hide: async (req) => {
        const { id, isDelete } = req.body;
        let newData = { isDelete: isDelete }
        return await model.CAR.update(newData, { where: { id: id } })
    },

    update: async (req) => {
        // async function filterNewUploads(files) {
        //     let fileNames = files.map(f => f.originalname);
        //     let existing = await model.IMG.findAll({
        //         where: { name: { [Op.in]: fileNames } },
        //         attributes: ["name"]
        //     });
        //     let existingNames = existing.map(f => f.fileName);
        //     let newFiles = files.filter(f => !existingNames.includes(f.originalname));
        //     return newFiles;
        // }
        // let newFiles = await filterNewUploads(req.files.carImage);

        let { carName, brandId, carDescription, offer, id } = { ...req.body };
        let { carThumbnail, carImage } = { ...req.files }
        let car = { carName, brandId, carDescription, }
        console.log(carImage)

        let isUpdateCarThumbnail = carThumbnail !== undefined

        await deleteOldCarImage(id)
        await saveNewCarImage(id, carImage)

        if (isUpdateCarThumbnail) {
            let fileName = await utility.file.genFileName(carThumbnail)
            car.carThumbnail = fileName[0]
            await deleteOldCarThumbnail(id)
            await saveNewCarThumbnail(fileName, carThumbnail)

        }

        await model.CAR.update(car, { where: { id: id } })
        await updateOffer(id, offer)
    },

    delete: async (req) => {
        await model.CAR.findOne(
            { where: req.body, },
        )
            .then(async (res) => {
                await res.destroy()
            })
    },
}
module.exports = car

function mapForeignKeyOffer(array, key) {
    return array.map(item => ({ ...item, "carId": key }))
}

function mapForeignKeyImage(array, key) {
    return array.map(item => ({ "name": item, "carId": key, "index": array.indexOf(item) }))
}

async function deleteOldCarImage(id) {
    let oldImage = await model.IMG.findAll({ where: { carId: id } })
    for (obj in oldImage) { utility.file.deleteFile(obj.name) }
    await model.IMG.destroy({ where: { carId: id } })
}

async function saveNewCarImage(_idCar, _carImage) {
    let fileName = await utility.file.genFileName(_carImage)
    utility.file.saveFile(fileName, _carImage)
    let newImg = fileName.map((img, index) => { return { name: img, carId: _idCar, index: index } })
    await model.IMG.bulkCreate(newImg)
}

function saveNewCarThumbnail(_filename, _filesCarThumbnail) {
    utility.file.saveFile(_filename, _filesCarThumbnail)
}

async function deleteOldCarThumbnail(_idCar) {
    let car = await model.CAR.findByPk(_idCar)
    utility.file.deleteFile(car.carThumbnail)
}

async function updateOffer(_idCar, _offer) {
    offer = JSON.parse(_offer)
    let newOffer = offer.map((res) => { return { ...res, carId: _idCar } })
    await model.OFFER.destroy({ where: { carId: _idCar } })
    await model.OFFER.bulkCreate(newOffer)
}