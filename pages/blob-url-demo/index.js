import Image from "next/image";
import { useState } from "react";
import { Button, Textarea } from 'antd';

export default function Home(){
  const [imgUrl, setImgUrl] = useState('');


  const getObjectURL = (file) => {
    let url;
    if (window.createObjectURL) {
      url = window.createObjectURL(file);
    } else if (window.URL) {
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL) {
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImgUrl(getObjectURL(file));
    }
  }

  return (
    <div style={{padding: '20px'}}>
      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      <div style={{border: '1px solid #cecece'}}>
        上传的图片为：
        {imgUrl && <Image src={imgUrl} alt="img" width={200} height={200}/>}
      </div>
    </div>
    
  )
}