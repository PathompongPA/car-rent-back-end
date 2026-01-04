require('dotenv');
const model = require("../model");
const utility = require("../utility");
const dayjs = require('dayjs');
const carService = require('./car/car.service');
const { saveFile, genFileName, deleteFile } = require('../utility/saveFile');

let car = {

    create: async (req) => {
        let { carName, brandId } = { ...req.body };
        let { carThumbnail } = req.files;
        let thumbnail = carThumbnail
        fileName = await utility.file.genFileName(carThumbnail)
        utility.file.saveFile(fileName, thumbnail)
        let car = {
            "carName": carName,
            "brandId": brandId,
            "carThumbnail": fileName[0],
            "index": -1
        }
        await model.CAR.create(car)
    },
    addImage: async (req) => {
        const { image } = { ...req.files };
        const { carId } = { ...req.body };
        let fileName = await utility.file.genFileName(image)
        saveNewImage(fileName, image)
        let createImage = fileName.map((name, index) => model.IMG.create({ carId, name, index }))
        await Promise.all(createImage)
    },

    read:
        async (req) => {
            let car = await model.CAR.findAll({
                order: [["index", "ASC"]],
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
                        order: [["offerPrice", "DESC"]]
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
                    let protocol = req.hostname === "www.carrent88.com" ? "https" : "http"
                    const baseUrl = `${protocol}://${req.hostname}/uploads/`;
                    console.log(baseUrl)
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
        const { id } = req.body;
        let recode = await model.CAR.findOne({ where: { id: id } })
        return await recode.update({ isDelete: !recode.isDelete })
    },

    addThumbnail: async (req) => {
        const { thumbnail } = { ...req.files };
        const { id } = { ...req.body };
        let fileName = await genFileName(thumbnail)
        console.log(fileName);
        saveFile(fileName, thumbnail)
        let recode = await model.CAR.findByPk(id).then(res => {
            console.log(res.carThumbnail);
            deleteFile(res.carThumbnail)
            return res
        }
        )
        recode.update({ carThumbnail: fileName[0] })
    },
    update: async (req) => {
        console.log(req.body);
        let { id, Imgs, carThumbnail, offers } = req.body;
        if (carThumbnail) delete req.body.carThumbnail
        await model.sequelize.transaction(async (t) => {
            await model.CAR.update(req.body, { where: { id } })
            await carService.update.images(id, { Imgs }, t)
            await carService.update.indexImages(Imgs)
            await carService.update.offer(id, offers, t)
            return true
        })
        // car > id, name, description, thumbnail, index 
        // let { carThumbnail, offers, Imgs, id, newImage } = {
        //     ...req.body
        // };
        // let update = { ...req.body }
        // console.log(update);
        // if (!id) throw new Error("ไม่พบ id ")
        // if (newImage) {
        //     await model.IMG.create({ "name": newImage, "carId": id })
        // }
        // if (carThumbnail) {
        //     update.carThumbnail = carThumbnail?.split("/").at(-1)
        // }
        // await model.CAR.update(update, { where: { id } })

        // if (Imgs) {
        //     const updatePromises = Object.values(offers).map((item) => {
        //         let newItem = item
        //         newItem.carId = id
        //         model.OFFER.upsert(newItem)
        //     })
        //     await Promise.all(updatePromises)
        // }
        // if (offers) {
        //     const updatePromises = Object.values(offers).map((item) => {
        //         let newItem = item
        //         newItem.carId = id
        //         model.OFFER.update(newItem, { where: { id } })
        //     })
        //     await Promise.all(updatePromises)
        // }
    },

    updateIndex: async (req) => {
        let body = { ...req.body.payload }
        const updatePromises = Object.values(body).map((item) => model.CAR.update({ index: item.index }, { where: { id: item.id } }))
        await Promise.all(updatePromises)
        return { msg: "ลำดับรถ" }
    },

    delete: async (req) => {
        await model.CAR.findOne(
            { where: req.body, },
        )
            .then(async (res) => {
                await res.destroy()
            })
    },
    deleteImage: async (req) => {
        await model.IMG.findOne(
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

function saveNewImage(_filename, _filesCarThumbnail) {
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