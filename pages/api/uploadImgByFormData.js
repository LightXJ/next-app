import fs from 'fs';
import path from 'path';
import nc from 'next-connect';
import formidable from 'formidable';


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const UPLOAD_DIR = path.join(process.env.ROOT, 'public');

// 通过formData上传图片
const handler = nc({
  onError: (err, req, res)=>{
    res.status(500).end("Something broke!");
  },
  onNotMatch: (req, res) => {
    res.status(404).end('Api is not found');
  }
})
.post((req, res)=>{
  const form = new formidable.IncomingForm()

  try{
    form.parse(req, (err, fields, files)=>{
      if(err){
        res.status(200).json({
          success: false,
          error: {
            message: '上传失败'
          }
        })
      }else{
        const { name } = fields;
        const { imgData } = files;
        const { filepath } = imgData;
        try{
          fs.renameSync(filepath, `${UPLOAD_DIR}/${name}`);
          res.status(200).json({
            success: true,
            error: {
              message: '上传成功'
            }
          })
        }catch(err){
          res.status(200).json({
            success: false,
            error: {
              message: '上传失败'
            }
          })
        }
      }
    })
  }catch(err){
    res.status(200).json({
      success: false,
      error: {
        message: '上传失败'
      }
    })
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
}
