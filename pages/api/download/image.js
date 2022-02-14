import fs from 'fs';
import path from 'path';

const DOWNLOAD_DIR = path.join(process.env.ROOT, 'public');

export default function handler(req, res) {
  const file = fs.readFileSync(`${DOWNLOAD_DIR}/city.jpeg`);
  res.setHeader('Content-Type', 'image/jpeg');
  res.status(200).send(file);
}