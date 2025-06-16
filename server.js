import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import https from "https";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Recuperar __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));


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
    /*fs.writeFile(filePath, JSON.stringify(nuevasAsignaturas, null, 2), "utf8", (err) => {
      if (err) return res.status(500).json({ error: "Error al escribir el archivo" });
    });*/
      res.json(nuevasAsignaturas); // Devolver el nuevo contenido
    
  });

// 🔹 Guardar asignaturas (uso remoto)
app.post("/guardar-asignaturas", (req, res) => {
  const { nombre, contenido } = req.body;

  if (!nombre || !contenido || !Array.isArray(contenido)) {
    return res.status(400).json({ error: "Datos inválidos." });
  }

  const rutaArchivo = path.join(__dirname, "public", nombre);

  fs.writeFile(rutaArchivo, JSON.stringify(contenido, null, 2), (err) => {
    if (err) {
      console.error("Error al guardar el archivo:", err);
      return res.status(500).json({ error: "No se pudo guardar el archivo." });
    }

    console.log(`Archivo guardado exitosamente como ${nombre}`);
    res.json({ mensaje: "Archivo guardado exitosamente." });
  });
});

// 🔹 Eliminar archivo de asignaturas (uso remoto)
app.post("/eliminar-json", (req, res) => {
  const { nombre } = req.body;

  if (!nombre || !nombre.endsWith(".json")) {
    return res.status(400).json({ error: "Nombre de archivo inválido." });
  }

  const rutaArchivo = path.join(__dirname, "public", nombre);

  fs.unlink(rutaArchivo, (err) => {
    if (err) {
      console.error("Error al eliminar el archivo:", err);
      return res.status(500).json({ error: "Error al eliminar el archivo." });
    }
    console.log(`Archivo eliminado correctamente: ${nombre}`);
    res.json({ mensaje: "Archivo eliminado correctamente." });
  });
});

/* 🔹 Guardar asignaturas (uso remoto)
app.post("/guardar-asignaturas", (req, res) => {
  const data = req.body;
  const archivo = req.query.archivo;

  if (!archivo || typeof archivo !== "string") {
    return res.status(400).send("Nombre de archivo no proporcionado o inválido.");
  }

  const filePath = path.join(__dirname, "public", archivo);

  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error al guardar:", err);
      return res.status(500).send("Error al guardar.");
    }
    res.send("Guardado correctamente.");
  });
});*/

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
    const { subjects, eventoAEliminar } = req.body;
  
    if (!Array.isArray(subjects) || !eventoAEliminar) {
      return res.status(400).json({ error: "Datos de entrada inválidos" });
    }
  
    const horaInicioEventoSelect = eventoAEliminar.start.getHours() < 10
              ? selectedEvent.start.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) // H:mm
              : selectedEvent.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:mm

    const duracionEventoSelect = (eventoAEliminar.end - eventoAEliminar.start) / (1000 * 60 * 60);

    try {
      const nuevasAsignaturas = subjects.filter(asig =>
        !(
          asig.Codigo === eventoAEliminar.codigo &&
          asig.Siglas === eventoAEliminar.siglas &&
          asig.Dia === eventoAEliminar.dia &&
          asig.Grupo === eventoAEliminar.grupo &&
          asig.GrupoLaboratorio === eventoAEliminar.grupoLaboratorio &&
          asig.Nombre === eventoAEliminar.nombre &&
          asig.Semestre === eventoAEliminar.semestre &&
          asig.Clase === eventoAEliminar.aula &&
          asig.Profesor === eventoAEliminar.profesor &&
          asig.Grado === eventoAEliminar.grado &&
          (asig.Mencion ?? "") === (eventoAEliminar.mencion ?? "") &&
          asig.Curso === eventoAEliminar.curso &&
          asig.Color === eventoAEliminar.color &&
          asig.HoraInicio === horaInicioEventoSelect &&
          asig.Duracion === duracionEventoSelect
        )
      );
  
      //fs.writeFileSync(filePath, JSON.stringify(nuevasAsignaturas, null, 2), "utf8"); solo si se quiere escribir directamente desde el back

      res.status(200).json(nuevasAsignaturas); // Devolver contenido actualizado
    } catch (error) {
      console.error("❌ Error eliminando asignatura:", error);
      res.status(500).json({ mensaje: "Error al eliminar la asignatura", error: error.message });
    } 
});

//🔹 Obtener lista de archivos .json en carpeta public
app.get("/listar-json", (req, res) => {
  const publicPath = path.join(__dirname, "public");

  fs.readdir(publicPath, (err, files) => {
    if (err) {
      console.error("Error leyendo la carpeta public:", err);
      return res.status(500).send("Error al leer los archivos.");
    }

    const jsonFiles = files.filter((file) => file.endsWith(".json"));
    res.json(jsonFiles);
  });
});

// 🔹 Iniciar servidor (uso local)
//app.listen(5000, () => console.log(`🚀 Servidor corriendo en http://localhost:${5000}`));

// 🔹 Iniciar servidor (uso remoto, necesario previamente crear certificados)
const options = {
  key: fs.readFileSync("./cert/key.pem"),
  cert: fs.readFileSync("./cert/cert.pem")
};

https.createServer(options, app).listen(8081, "0.0.0.0", () => {
  console.log("Servidor HTTPS backend en https://192.168.56.1:8081");
});