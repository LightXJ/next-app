import fs from 'fs';
import nc from 'next-connect';
import Joi from 'joi';
import { validate } from '../server/middlewares/validation';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const schema = Joi.object({
  imgData: Joi.string().required(),
  name: Joi.string().required(),
});

// 通过base64上传图片
const handler = nc({
  onError: (err, req, res)=>{
    res.status(500).end("Something broke!");
  },
  onNotMatch: (req, res) => {
    res.status(404).end('Api is not found');
  }
})
.post(validate({body: schema}), (req, res)=>{
  const { body } = req;
  const { imgData, name='image.png' } = body;
  let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  let dataBuffer = Buffer.from(base64Data, 'base64');

  fs.writeFile(name, dataBuffer, function(err) {
      if(err){
        res.status(200).json({
          success: false,
          error: {
            message: '上传失败'
          }
        })
      }else{
        res.status(200).json({
          success: true,
          message: '上传成功'
        })
      }
  });
});

export default handler;
