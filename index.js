
import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "*", methods: ["GET"] }));

let plantas = [];
let recetas = [];

try {
  plantas = JSON.parse(fs.readFileSync('./data/plantas_con_imagen_3000.json', 'utf-8'));
  recetas = JSON.parse(fs.readFileSync('./data/recetas_100_detalladas.json', 'utf-8'));
} catch (e) {
  console.error("❌ Error cargando archivos JSON:", e.message);
}

app.get('/', (req, res) => {
  res.send('🌿 API de plantas y recetas naturales funcionando ✅');
});

app.get('/plantas', (req, res) => {
  const sintoma = req.query.sintoma?.toLowerCase() || '';
  const resultados = plantas.filter(p =>
    p.sintomas?.toLowerCase().includes(sintoma) ||
    p.usos?.toLowerCase().includes(sintoma) ||
    p.nombre_comun?.toLowerCase().includes(sintoma) ||
    p.nombre_cientifico?.toLowerCase().includes(sintoma)
  ).slice(0, 5);
  res.json(resultados);
});

app.get('/recetas', (req, res) => {
  res.json(recetas);
});

app.listen(port, () => {
  console.log(`🚀 API escuchando en http://localhost:${port}`);
});
