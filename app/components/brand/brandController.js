const httpStatus = require('http-status');
const Brand = require('./brand');

const getBrands = async (req, res) => {
    try {
        const brands = await Brand.getBrands();
        if (brands.length > 0) {
            return res
                .status(httpStatus.OK)
                .send(brands);
        } else if (brands.length === 0) {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'No se encontraron marcas' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo obtener la información de las marcas' });
    }
}

const getBrandById = async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await Brand.getBrandById(id);
        if (brand) {
            return res
                .status(httpStatus.OK)
                .send(brand);
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'No se encontró la marca' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const createBrand = async (req, res) => {
    const { body } = req;
    try {
        const brand = await Brand.createBrand(body);
        return res
            .status(httpStatus.CREATED)
            .send(brand),
            err => {
                console.error(err);
                return res
                    .status(httpStatus.BAD_REQUEST)
                    .send({ message: 'Error, datos incompletos' });
            }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'No se pudo crear la marca' });
    }
}

const updateBrand = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const wasUpdated = await Brand.updateBrand(id, body);
        if (wasUpdated) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Actualizado correctamente' });
        } else {
            return res
                .status(httpStatus.OK)
                .send({ message: 'No se actualizó la marca, la información es igual' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

const deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
        const wasDeleted = await Brand.deleteBrand(id);
        if (wasDeleted) {
            return res
                .status(httpStatus.OK)
                .send({ message: 'Marca borrada correctamente' });
        } else {
            return res
                .status(httpStatus.NOT_FOUND)
                .send({ message: 'Marca no encontrada' });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: 'Ocurrió un error interno' });
    }
}

module.exports = {
    getBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand
};