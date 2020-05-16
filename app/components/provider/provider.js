const db = require('../../../config/db/sequelize');
let Provider = require('../../../config/db/models/provider');

Provider = Provider(db.sequelize, db.Sequelize);

const getAllProviders = async () => {
    const providers = await Provider.findAll();
    const providersFormatted = providers.map((provider) => ({
        id: provider.id,
        businessName: provider.razon_social,
        nit: provider.nit,
        number: provider.telefono,
        email: provider.email,
        address: provider.direccion
    }));

    return providersFormatted;
}

const getProviderById = async (id) => {
    const provider = await Provider.findByPk(id);

    if (!provider) return null;

    const providerFormatted = {
        id: provider.id,
        businessName: provider.razon_social,
        nit: provider.nit,
        number: provider.telefono,
        email: provider.email,
        address: provider.direccion
    };

    return providerFormatted;
}

const createProvider = async (providerData) => {
    const {businessName, nit, number, email, address} = providerData;

    const provider = await Provider.create({
        razon_social: businessName,
        nit: nit,
        telefono: number,
        email: email,
        direccion: address
    });

    const providerFormatted = {
        id: provider.id,
        businessName: provider.razon_social,
        nit: provider.nit,
        number: provider.telefono,
        email: provider.email,
        address: provider.direccion
    };

    return providerFormatted;
}

const updateProviderById = async (id, providerData) => {
    const {businessName, nit, number, email, address} = providerData;

    const provider = {
        razon_social: businessName,
        nit: nit,
        telefono: number,
        email: email,
        direccion: address
    };

    const [row] = await Provider.update({ ...provider }, {where: { id }});
    return row;
}

module.exports = {
    getAllProviders,
    getProviderById,
    createProvider,
    updateProviderById
}