import fs from 'fs';
import path from 'path';

const DOWNLOAD_DIR = path.join(process.env.ROOT, 'public');

export default function handler(req, res) {
  console.log('bigfile');
  const src = fs.createReadStream(`${DOWNLOAD_DIR}/big.pdf`); // 大文件使用流的方式
  fs.stat(`${DOWNLOAD_DIR}/big.pdf`,(err, stat)=>{
    console.log(stat);
  })
  src.pipe(res);
  res.status(200);
}