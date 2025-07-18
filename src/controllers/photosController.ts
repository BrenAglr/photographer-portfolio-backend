// controllers/photosController.ts
import { Request, Response } from "express";
import imagekit from "../utils/imagekit";

// Helper para filtrar archivos y mapear URLs
const processFiles = (files: any[]) => {
  return files
    .filter((file) => file.type === "file") // Ignorar carpetas
    .map((file) => ({
      url: file.url,
      type: file.fileType,
    }));
};

// Helper para formatear nombres de grupos (opcional)
const formatGroupName = (name: string) => {
  return name.replace(/-/g, " "); // "Sesion-Augus" → "Sesion Augus"
};

export const getPhotosByGroup = async (req: Request, res: Response) => {
  const { section, group } = req.params;
  const folderPath = `PortfolioCipri/${section}/${group}`;

  try {
    const files = await imagekit.listFiles({ path: folderPath });
    res.json(processFiles(files));
  } catch (error) {
    console.error("Error en getPhotosByGroup:", error);
    res.status(500).json({ error: "Error al obtener imágenes del grupo" });
  }
};

export const getPhotosBySection = async (req: Request, res: Response) => {
  const { section } = req.params;
  const basePath = `PortfolioCipri/Preseccion/${section}`;

  try {
    // 1. Obtener todas las subcarpetas (grupos)
    const allContents = await imagekit.listFiles({
      path: basePath,
      includeFolder: true,
    });

    // 2. Filtrar solo carpetas (grupos)
    const folders = allContents.filter((item) => item.type === "folder");

    // 3. Para cada grupo, obtener sus primeras imágenes (máx 5)
    const groupsWithImages = await Promise.all(
      folders.map(async (folder) => {
        const groupPath = `${basePath}/${folder.name}`;
        const images = await imagekit.listFiles({
          path: groupPath,
          limit: 5, // Limitar a 5 imágenes por grupo
        });

        return {
          groupName: formatGroupName(folder.name), // Nombre formateado (opcional)
          groupSlug: folder.name, // Nombre original (ej: "Sesion-Augus")
          images: processFiles(images), // Usa el helper existente
        };
      })
    );

    res.json(groupsWithImages);
  } catch (error) {
    console.error("Error en getPhotosBySection:", error);
    res.status(500).json({ error: "Error al obtener la sección" });
  }
};

export const getPhotosHome = async (req: Request, res: Response) => {
  const { section } = req.params;
  const folderPath = `PortfolioCipri/Home/${section}`;

  try {
    const files = await imagekit.listFiles({ 
      path: folderPath,
      limit: 10,
    });
    res.json(processFiles(files));
  } catch (error) {
    console.error("Error en getPhotosHome:", error);
    res.status(500).json({ error: "Error al obtener imágenes de la Home" });
  }
};