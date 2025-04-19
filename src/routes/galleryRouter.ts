import { Router } from "express";
import { getPhotosByGroup, getPhotosBySection } from "../controllers/photosController";

const galleryRouter = Router();


// Ruta de prueba: http://localhost:3000/api/gallery/eventos-sociales
galleryRouter.get("/gallery/:section", getPhotosBySection);


// Ruta de prueba: http://localhost:3000/api/gallery/eventos-sociales/casamiento-cintia-daniel
galleryRouter.get("/gallery/:section/:group", getPhotosByGroup);

export default galleryRouter;
