import { Router } from "express";
import galleryRouter from "./galleryRouter";

const indexRouter: Router = Router();

//ROUTES
indexRouter.use("/api", galleryRouter);

export default indexRouter;