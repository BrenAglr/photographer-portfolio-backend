import { Router } from "express";
import { getPhotosByGroup, getPhotosBySection, getPhotosHome } from "../controllers/photosController";

const galleryRouter = Router();


// Ruta de prueba: http://localhost:3001/api/gallery/Preseccion/Naturaleza/Animales
galleryRouter.get("/gallery/preseccion/:section", getPhotosBySection);


// Ruta de prueba: http://localhost:3001/api/gallery/Naturaleza/Mar
galleryRouter.get("/gallery/:section/:group", getPhotosByGroup);

// Ruta de prueba: http://localhost:3001/api/gallery/Home/Naturaleza
galleryRouter.get("/gallery/home/:section", getPhotosHome)

export default galleryRouter;
