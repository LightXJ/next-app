import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList, file }) => {
    console.log('file', file.name, file.status);
    setFileList(newFileList);
  };

  const onPreview = (file: UploadFile) => {
    const src = file.url as string;
    if (!src) {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj as RcFile);
      reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
      }
    }else{
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    }
  };

  // // 阻止自动上传
  const handleBeforeUpload = (file, fileList)=>{
    console.log('fileList', fileList);
    return false;
  } 


  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      beforeUpload={handleBeforeUpload}
      onPreview={onPreview}
      multiple
    >
      {fileList.length < 5 && '+ Upload'}
    </Upload>
  );
};

export default App;