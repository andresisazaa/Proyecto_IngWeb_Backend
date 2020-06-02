const db = require('../../../config/db/sequelize');
let Brand = require('../../../config/db/models/brand');

Brand = Brand(db.sequelize, db.Sequelize);

const createBrand = async (body) => {
    const { brandName, brandLogo } = body;
    const newBrand = await Brand.create({
        nombre_marca: brandName,
        logo_url: brandLogo
    });

    const brandFormatted = {
        id: newBrand.id,
        brandName: newBrand.nombre_marca
    };
    return brandFormatted;
}

const getBrands = async () => {
    const brands = await Brand.findAll();
    const brandsFormatted = brands.map(brand => {
        return {
            id: brand.id,
            brandName: brand.nombre_marca,
            brandLogo: brand.logo_url
        };
    });
    return brandsFormatted;
}

const getBrandById = async (id) => {
    const brand = await Brand.findByPk(id);
    if (!brand) return null;
    const brandFormatted = {
        id: brand.id,
        brandName: brand.nombre_marca,
        brandLogo: brand.logo_url
    };
    return brandFormatted;
}

const updateBrand = async (id, body) => {
    const { brandName } = body;
    const brandData = { nombre_marca: brandName };
    const [updatedRow] = await Brand.update({ ...brandData }, { where: { id } });
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