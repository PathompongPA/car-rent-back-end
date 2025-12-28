const { Op } = require("sequelize")
const model = require("../../model")
const { deleteFile } = require("../../utility/saveFile")

let carService = {
    update: {
        car: async (carId, payload, t) => {
            if (!carId) throw Error("car name must has.")
            await model.CAR.update(
                { payload },
                {
                    where: { id: carId },
                    transaction: { t }
                })
        },
        offer: async (carId, offers, t) => {
            if (!carId) throw new Error("carId is required");

            // 1. เอาเฉพาะ id ที่มีจริง
            const offerIds = offers
                .filter(o => o.id)
                .map(o => o.id);

            // 2. ลบ offer ที่ไม่อยู่ใน payload
            await model.OFFER.destroy({
                where: {
                    carId,
                    ...(offerIds.length && { id: { [Op.notIn]: offerIds } })
                },
                transaction: t
            });

            // 3. upsert / create
            await Promise.all(
                offers.map(item => {
                    console.log(item);
                    if (item.id) {
                        return model.OFFER.update(item, { where: { id: item.id }, transaction: t })
                    } else {
                        return model.OFFER.create({ ...item, carId }, { transaction: t });
                    }
                })
            );
        },
        indexImages: async (images = []) => {
            console.log(images);
            let updateIndex = images.map((url, index) => {
                let name = url.split("/").at(-1)
                model.IMG.update({ index: index }, { where: { name: name } })
            })
            await Promise.all(updateIndex)
        },
        images: async (carId, payload, t) => {
            let { Imgs } = payload;
            if (!Imgs) throw Error("ไม่พบรูป")
            if (!carId) throw Error("car name must has.")
            Imgs = Imgs.map(item => item.split("/").at(-1))
            let oldImage = await model.IMG.findAll({ where: { carId }, attributes: ["name"], raw: true }).then(item => item.map(obj => obj.name))
            let imageToDelete = oldImage.filter(img => !Imgs.includes(img))
            let deleteImage = imageToDelete.map(imageName => {
                console.log("image name : ", imageName);
                deleteFile(imageName)
                model.IMG.destroy({ where: { name: imageName }, transaction: t })
            })
            await Promise.all(deleteImage)
        },
    }
}

module.exports = carService