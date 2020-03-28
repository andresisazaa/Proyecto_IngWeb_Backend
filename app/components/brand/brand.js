const db = require('../../../config/db/sequelize');
let Brand = require('../../../config/db/models/brand');

Brand = Brand(db.sequelize, db.Sequelize);

const createBrand = async (body) => {
    const { brandName } = body;
    const newBrand = await Brand.create({
        nombre_marca: brandName
    });

    const brandFormatted = {
        id: newBrand.dataValues.id,
        brandName: newBrand.dataValues.nombre_marca
    };
    return brandFormatted;
}

const getBrands = async () => {
    const brands = await Brand.findAll();
    const brandsFormatted = brands.map(brand => {
        return {
            id: brand.dataValues.id,
            brandName: brand.dataValues.nombre_marca
        };
    });
    return brandsFormatted;
}

const getBrandById = async (id) => {
    const brand = await Brand.findByPk(id);
    if (!brand) return null;
    const brandFormatted = {
        id: brand.dataValues.id,
        brandName: brand.dataValues.nombre_marca
    };
    return brandFormatted;
}

const updateBrand = async (id, body) => {
    const [updatedRow] = await Brand.update({ ...body }, { where: { id } });
    return updatedRow;
}

const deleteBrand = async (id) => {
    const deletedRow = await Brand.destroy({ where: { id } });
    return deletedRow;
}

module.exports = {
    createBrand,
    getBrands,
    getBrandById,
    updateBrand,
    deleteBrand
};