const httpStatus = require("http-status");
const PointOfSale = require("./pointOfSale");
const { isValidScope } = require('../../services/utils')

const component = 'PointOfSale';

const getPointsOfSales = async (req, res) => {
  const role = res.locals.infoCurrentUser.job.id
  const isPermitted = isValidScope(getPointsOfSales.name, component, role)
  if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
  try {
    const pointsOfSale = await PointOfSale.getPointsOfSale();
    return res
        .status(httpStatus.OK)
        .send(pointsOfSale);

  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({
        message: "No se pudo obtener la información de los puntos de venta",
      });
  }
};

const getPointOfSaleById = async (req, res) => {
  const role = res.locals.infoCurrentUser.job.id
  const isPermitted = isValidScope(getPointOfSaleById.name, component, role)
  if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
  const { id } = req.params;

  try {
    const pointsOfSale = await PointOfSale.getPointOfSaleById(id);
    if (pointsOfSale) {
      return res.status(httpStatus.OK).send(pointsOfSale);
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "No se encontró el punto de venta" });
    }
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "No se puede traer la información del punto de venta" });
  }
};

const createPointOfSale = async (req, res) => {
  const role = res.locals.infoCurrentUser.job.id
  const isPermitted = isValidScope(createPointOfSale.name, component, role)
  if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
  const { address, posName } = req.body;

  if(!address || !posName) {
    return res
    .status(httpStatus.BAD_REQUEST)
    .send({ message: "Parámetros invalidos" });
  }

  try {
    const pointsOfSale = await PointOfSale.createPointOfSale(req.body);
    return res
        .status(httpStatus.CREATED)
        .send(pointsOfSale)

  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "No se pudo crear el punto de venta" });
  }
};

const updatePointOfSale = async (req, res) => {
  const role = res.locals.infoCurrentUser.job.id
  const isPermitted = isValidScope(updatePointOfSale.name, component, role)
  if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
  const { id } = req.params;
  
  try {
    const wasUpdated = await PointOfSale.updatePointOfSale(id, req.body);

    if (wasUpdated) {
      return res
        .status(httpStatus.OK)
        .send({ message: "Actualizado correctamente" });
    } else {
      return res
        .status(httpStatus.OK)
        .send({
          message: "No se actualizó el punto de venta, la información es igual",
        });
    }
  } catch (error) {

    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Ocurrió un error interno" });
  }
};

const deletePointOfSale = async (req, res) => {
  const role = res.locals.infoCurrentUser.job.id
  const isPermitted = isValidScope(deletePointOfSale.name, component, role)
  if(!isPermitted) return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Usted no cuenta con permisos para ejecutar esta acción' });
  const { id } = req.params;
  try {
    const wasDeleted = await PointOfSale.deletePointOfSale(id);
    if (wasDeleted) {
      return res
        .status(httpStatus.OK)
        .send({ message: "Punto de venta borrado correctamente" });
    } else {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "Punto de venta no encontrado" });
    }
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Ocurrió un error interno" });
  }
};

module.exports = {
  getPointsOfSales,
  getPointOfSaleById,
  createPointOfSale,
  updatePointOfSale,
  deletePointOfSale,
};
