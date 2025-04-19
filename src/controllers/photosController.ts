import cloudinary from "../utils/cloudinary";
import { Request, Response } from "express"

export const getPhotosBySection = async (req, res) => {
  const { section } = req.params;
  const folderPath = `portfolio-cipri/${section}`;

  try {
    const result = await cloudinary.search
      .expression(`folder:${folderPath}`)
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    const files = result.resources.map((file: any) => ({
      url: file.secure_url,
      type: file.resource_type,
    }));

    res.json(files);
  } catch (error) {
    console.error("Error al obtener recursos de Cloudinary:", error);
    res.status(500).json({ error: "No se pudo obtener la galería" });
  }
}

export const getPhotosByGroup = async (req: Request, res: Response): Promise<void> => {
    const { section, group } = req.params;
  
    const folderPath =`portfolio-cipri/${section}/${group}`
   
    console.log("Buscando en carpeta:", folderPath);
  
    try {
      const result = await cloudinary.search
        .expression(`folder:${folderPath}`)
        .sort_by("public_id", "desc")
        .max_results(30)
        .execute();
  
      const files = result.resources.map((file: any) => ({
        url: file.secure_url,
        type: file.resource_type,
      }));
  
      res.json(files);
    } catch (error) {
      console.error("Error al obtener recursos de Cloudinary:", error);
      res.status(500).json({ error: "No se pudo obtener la galería" });
    }
  };