import multer from "fastify-multer";
import path from "path";

import * as CarsController from "../controllers/cars-controller.js";
import * as BrandController from "../controllers/brand-controller.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    cb(null, file.fieldname + "-" + Date.now() + extension);
  },
});

const upload = multer({ storage });

const routes = {
  createCar: {
    method: "POST",
    url: "/cars",
    preHandler: upload.single("image"),
    handler: CarsController.create,
  },
  delCar: {
    method: "DELETE",
    url: `/cars`,
    handler: CarsController.del,
  },
  getCar: {
    method: "GET",
    url: `/cars`,
    handler: CarsController.get,
  },
  updateCar: {
    method: "PATCH",
    url: `/cars`,
    preHandler: upload.single("image"),
    handler: CarsController.update,
  },
  createBrand: {
    method: "POST",
    url: "/brand",
    handler: BrandController.create,
  },
  delBrand: {
    method: "DELETE",
    url: `/brand`,
    handler: BrandController.del,
  },
  getBrand: {
    method: "GET",
    url: `/brand`,
    handler: BrandController.get,
  },
  putBrand: {
    method: "PUT",
    url: `/brand`,
    handler: BrandController.put,
  },
};

const renderRoutes = Object.values(routes);

export default (fastify, _, next) => {
  for (const route of renderRoutes) {
    fastify.route(route);
  }
  next();
};
