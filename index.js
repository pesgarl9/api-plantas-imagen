
import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
  origin: "*",
  methods: ["GET"]
}));

const plantas = JSON.parse(fs.readFileSync('./data/plantas_con_imagen_3000.json', 'utf-8'));
const recetas = JSON.parse(fs.readFileSync('./data/recetas_100_detalladas.json', 'utf-8'));

app.get('/plantas', (req, res) => {
  const sintoma = req.query.sintoma?.toLowerCase() || '';
  const resultados = plantas.filter(p =>
    p.sintomas.toLowerCase().includes(sintoma) ||
    p.usos.toLowerCase().includes(sintoma) ||
    p.nombre_comun.toLowerCase().includes(sintoma) ||
    p.nombre_cientifico.toLowerCase().includes(sintoma)
  ).slice(0, 5);
  res.json(resultados);
});

app.get('/recetas', (req, res) => {
  res.json(recetas);
});

app.get('/', (req, res) => {
  res.send('API de plantas medicinales y recetas naturales funcionando ✅');
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
