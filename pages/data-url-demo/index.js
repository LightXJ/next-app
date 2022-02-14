import Image from "next/image";
import { useState } from "react";
import { Button, Input } from 'antd';

export default function Home(){
  const [imgUrl, setImgUrl] = useState('');
  const [text, setText] = useState('');

  const handleChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = function(){
        setImgUrl(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }

  const handleInputChange = (e) => {
    setText(e.target.value);
  }

  const handleDownload = () => {
    const blob = new Blob([text]);
    const reader = new FileReader();
    reader.onload = function(){
      const link = document.createElement('a');
      link.download = '文本.txt';
      link.href=reader.result;
      link.click();
      link.remove();
    }
    reader.readAsDataURL(blob);
  }

  return (
    <div style={{padding: '20px'}}>
      <input type="file" accept="image/jpeg" onChange={handleChange} />
      <div style={{border: '1px solid #cecece'}}>
        上传的图片为：
        {imgUrl && <Image src={imgUrl} alt="img" width={200} height={200}/>}
      </div>
      <div>

      </div>
      <div style={{border: '1px solid #cecece', marginTop: '10px'}}>
        <p style={{wordBreak: 'break-word'}}>
          data:image/gif;base64,R0lGODlhAwADAIAAAP///8zMzCH5BAAAAAAALAAAAAADAAMAAAIEBHIJBQA7呈现的图片：
        </p>
        <Image 
          src="data:image/gif;base64,R0lGODlhAwADAIAAAP///8zMzCH5BAAAAAAALAAAAAADAAMAAAIEBHIJBQA7" 
          alt=""
          width={200} 
          height={200}
        ></Image>
      </div>

      <div>
        请输入：
        <Input.TextArea onChange={handleInputChange} />
        <Button onClick={handleDownload}>下载输入的内容</Button>
      </div>
    </div>
    
  )
}