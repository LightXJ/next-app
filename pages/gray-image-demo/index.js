import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from 'antd';

import React from 'react';

const COLOR_NORMAL = 'normal';
const COLOR_GRAY = 'gray';

export default function Demo(){
  const [imgUrl, setImgUrl] = useState('');
  const [grayImgUrl, setGrayImgUrl] = useState('');
  const [colorStyle, setColorStyle] = useState(COLOR_NORMAL);
  const imgRef = useRef();

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

  // 变灰
  const changeToGrayImage = () => {
    let canvas = document.createElement("canvas");
    let img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.src = imgUrl;

    img.onload = () => {
      const { width:targetWidth, height: targetHeight } = imgRef.current;
      const { width:imgWidth, height: imgHeight } = img;
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      let ctx = canvas.getContext("2d");
      let imageData, len, average, red, green, blue;
      ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // 取得图像数据
      imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);

      len = imageData.data.length;
      for(let i=0; i<len; i+=4){
        red = imageData.data[i];
        green = imageData.data[i + 1];
        blue = imageData.data[i + 2];
        //求得 rgb 平均值
        average = Math.floor((red + green + blue) / 3);
        //设置颜色值，透明度不变
        imageData.data[i] = average;
        imageData.data[i + 1] = average;
        imageData.data[i + 2] = average;
      }

      ctx.putImageData(imageData, 0, 0);

      let newImgUrl = canvas.toDataURL('image/jpeg');

      setGrayImgUrl(newImgUrl);
      setColorStyle(COLOR_GRAY);
    };
  }

  const changeToNormal = ()=>{
    setImgUrl(imgUrl);
    setColorStyle(COLOR_NORMAL);
  }

  const handleLoad = (e) => {
    if(e.target){
      imgRef.current = e.target;
    }
  }

  return (
    <div style={{padding: '20px'}}>
      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      <div style={{border: '1px solid #cecece'}}>
        上传的图片为：
        {imgUrl && <Image src={colorStyle === COLOR_GRAY ? grayImgUrl : imgUrl} alt="img" width={200} height={200} onLoad={handleLoad} />}
      </div>
      <Button onClick={changeToGrayImage}>一键变灰</Button>
      <Button onClick={changeToNormal}>恢复</Button>
    </div>
    
  )
}