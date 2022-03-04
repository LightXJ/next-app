import nc from 'next-connect';
import formidable from 'formidable';

// 通过base64上传图片
const handler = nc({
  onError: (err, req, res)=>{
    res.status(500).end("Something broke!");
  },
  onNotMatch: (req, res) => {
    res.status(404).end('Api is not found');
  }
})
.post((req, res)=>{
  console.log(req.body);
  const form = new formidable.IncomingForm();
  
  try{
    form.parse(req, (err, fields)=>{
      console.log(err);
      if(!err){
        console.log('fields is', fields);
        res.status(200).json({
          success: true,
          message: '提交成功'
        })
      }else{
        res.status(200).json({
          success: false,
          error: {
            message: '参数解析失败'
          }
        })
        console.log(err);
      }
    })
  }catch(err){
    console.log('err', err);
    res.status(200).json({
      success: false,
      error: {
        message: err
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