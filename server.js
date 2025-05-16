import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 🔹 Función para obtener la ruta del archivo según el parámetro 'archivo'
const getFilePath = (archivoParam) => {
  const archivo = archivoParam && archivoParam.trim() !== "" ? archivoParam : "asignaturas.json";
  return path.join(process.cwd(), "public", archivo);
};

// 🔹 Leer asignaturas
app.get("/asignaturas", (req, res) => {
  const filePath = getFilePath(req.query.archivo);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error al leer el archivo" });
    res.json(JSON.parse(data));
  });
});

// 🔹 Actualizar una asignatura
app.put("/asignaturas", (req, res) => {
    const filePath = getFilePath(req.query.archivo);
    const { nuevasAsignaturas, index, asignaturaModificada } = req.body;
  
    if (
      !Array.isArray(nuevasAsignaturas) ||
      typeof index !== "number" ||
      !asignaturaModificada
    ) {
      return res.status(400).json({ error: "Datos de entrada inválidos" });
    }
  
    // Reemplazar la asignatura en el índice indicado
    nuevasAsignaturas[index] = asignaturaModificada;
  
    // Guardar el archivo actualizado
    fs.writeFile(filePath, JSON.stringify(nuevasAsignaturas, null, 2), "utf8", (err) => {
      if (err) return res.status(500).json({ error: "Error al escribir el archivo" });
  
      res.json(nuevasAsignaturas); // Devolver el nuevo contenido
    });
  });

// 🔹 Añadir nuevas asignaturas
app.post("/asignaturas", (req, res) => {
    const filePath = getFilePath(req.query.archivo);
    const { originales, nuevos } = req.body;
  
    if (!originales || !nuevos) {
      return res.status(400).json({ error: "Faltan datos: se requieren 'originales' y 'nuevos'" });
    }
  
    const asignaturasActualizadas = [...originales, ...nuevos];
  
    /*fs.writeFile(filePath, JSON.stringify(asignaturasActualizadas, null, 2), "utf8", (writeErr) => {
      if (writeErr) return res.status(500).json({ error: "Error al escribir el archivo" });
      
    });*/
    res.json(asignaturasActualizadas);
  });

// 🔹 Borrar una asignatura específica
app.delete("/asignaturas/:codigo", (req, res) => {
    const filePath = getFilePath(req.query.archivo);
    const { subjects, asignaturaAEliminar } = req.body;
  
    if (!Array.isArray(subjects) || !asignaturaAEliminar) {
      return res.status(400).json({ error: "Datos de entrada inválidos" });
    }
  
    try {
      const nuevasAsignaturas = subjects.filter(asig =>
        !(
          asig.Codigo === asignaturaAEliminar.Codigo &&
          asig.Siglas === asignaturaAEliminar.Siglas &&
          asig.Dia === asignaturaAEliminar.Dia &&
          asig.Grupo === asignaturaAEliminar.Grupo &&
          asig.GrupoLaboratorio === asignaturaAEliminar.GrupoLaboratorio &&
          asig.Nombre === asignaturaAEliminar.Nombre &&
          asig.Semestre === asignaturaAEliminar.Semestre &&
          asig.Clase === asignaturaAEliminar.Clase &&
          asig.Profesor === asignaturaAEliminar.Profesor &&
          asig.Grado === asignaturaAEliminar.Grado &&
          (asig.Mencion ?? "") === (asignaturaAEliminar.Mencion ?? "") &&
          asig.Curso === asignaturaAEliminar.Curso &&
          asig.Color === asignaturaAEliminar.Color &&
          asig.HoraInicio === asignaturaAEliminar.HoraInicio &&
          asig.Duracion === asignaturaAEliminar.Duracion
        )
      );
  
      //fs.writeFileSync(filePath, JSON.stringify(nuevasAsignaturas, null, 2), "utf8"); solo si se quiere escribir directamente desde el back

      res.status(200).json(nuevasAsignaturas); // Devolver contenido actualizado
    } catch (error) {
      console.error("❌ Error eliminando asignatura:", error);
      res.status(500).json({ mensaje: "Error al eliminar la asignatura", error: error.message });
    }
});

// 🔹 Iniciar servidor
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));