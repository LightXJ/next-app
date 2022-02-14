import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image';
import { Button, message, Slider } from 'antd';
import axios from 'axios';
import styles from './index.module.css'
import { dataUrlToBlob } from '../../utils/index';

const MAX_IMG_WIDTH = 800;

export default function Home() {
  const [ imgUrl, setImgUrl ] = useState('');
  const [selectImage, setSelectImage] = useState('');
  const [compressedImage, setCompressedImage] = useState('');
  const [ratio, setRatio] = useState(100);
  const [uploading, setUploading] = useState(false);

  const handleGetImgByXHR = () => {
    var xhr = new XMLHttpRequest();    
    xhr.open("get", "https://s0.meituan.net/bs/fe-web-meituan/10afbf1/img/logo.png", true);
    xhr.responseType = "blob";
    xhr.onload = () =>{
      if (xhr.status === 200) {
        var blob = xhr.response;  // this.response也就是请求的返回就是Blob对象
        let url = window.URL.createObjectURL(blob);
        setImgUrl(url);
      }
    }
    xhr.send();
  }

  const handleGetImgByFetch = () => {
    fetch('http://localhost:3000/city.jpeg')
      .then(res=>{
        return res.blob();
      })
      .then((blob)=>{
        let url = window.URL.createObjectURL(blob);
        setImgUrl(url);
      })
  }

  
  const handleChunkUpload  = async () => {
    const file = new File(["a".repeat(1000000)], "test.txt");
    const chunkSize = 40000;
    const url = 'http://localhost:3000/api/upload';
    for (let start = 0; start < file.size; start += chunkSize) {
      const chunk = file.slice(start, start + chunkSize + 1);
      const fd = new FormData();
      fd.append("data", chunk);

      await fetch(url, { method: "post", body: fd }).then((res) =>{
        console.log(res);
      });
    }
  }

  const download = (fileName, blob) => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    link.remove();
    window.URL.revokeObjectURL(link.href);
  }


  // 下载资源
  const handleDownload = () => {
    const fileName = 'blob.txt';
    const myBlob = new Blob(['一文掌握Blob Web API'], { type: 'text/plain'});
    download(fileName, myBlob) ;
  }


  // 选择图片
  const loadFile = (event) => {
    setRatio(100);
    const curFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(){
      setSelectImage({
        imgData: reader.result,
        name: curFile.name
      });
      setCompressedImage({
        imgData: reader.result,
        name: curFile.name
      })
    };
    if(event.target.files.length>0){
      reader.readAsDataURL(curFile);
    }
  }

  // 提交选中的图片到后台-base64的方式
  const handleUploadByBase64 = () => {
    if(!compressedImage){
      return message.error('请先选择图片');
    }
    const { imgData, name } = compressedImage;
    setUploading(true);
    axios({
      method: 'POST',
      url: `http://localhost:3000/api/uploadImgByBase64`,
      data: {
        imgData,
        name
      },
    })
    .then(res=>{
      if(res.data.success){
        message.success('上传成功');
      }
    })
    .catch(err=>{
      console.log(err)
      message.error('上传失败');
    })
    .finally(()=>{
      setUploading(false);
    })
  }

  // 提交选中的图片到后台-formData的方式
  const handleUploadByFormData = () => {
    if(!compressedImage){
      return message.error('请先选择图片');
    }
    const { imgData, name } = compressedImage;

    const blob = dataUrlToBlob(imgData, 'image/jpeg');
    let formData = new FormData();
    formData.append('imgData', blob);
    formData.append('name', name);
    axios({
      method: 'POST',
      url: `http://localhost:3000/api/uploadImgByFormData`,
      data: formData,
    })
    .then(res=>{
      if(res.data.success){
        message.success('上传成功');
      }
    })
    .catch(err=>{
      console.log(err)
      message.error('上传失败');
    })
    .finally(()=>{
      setUploading(false);
    })
    // 
  }


  const compress = (base64, quality, mimeType) => {
    let canvas = document.createElement("canvas");
    let img = document.createElement("img");
    img.crossOrigin = "anonymous";
    return new Promise((resolve) => {
      img.src = base64;

      img.onload = () => {
        let targetWidth, targetHeight;
        if (img.width > MAX_IMG_WIDTH) {
          targetWidth = MAX_IMG_WIDTH;
          targetHeight = (img.height * MAX_IMG_WIDTH) / img.width;
        } else {
          targetWidth = img.width;
          targetHeight = img.height;
        }
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let imageData = canvas.toDataURL(mimeType, quality / 100);
        resolve(imageData);
      };
    });

  }

  const handleCompressRatioChange = async (value) => {
    try {
      let newImageData = await compress(selectImage.imgData, value, 'image/jpeg');
      setRatio(value);
      setCompressedImage({
        ...selectImage,
        imgData: newImageData,
      })
    }catch(err){
      console.log(err);
      message.error('压缩失败');
    }
  } 

  // 一键压缩图片质量
  const handleCompress = async () => {
    setRatio(90);
    try {
      let newImageData = await compress(selectImage.imgData, 90, 'image/jpeg');
      setCompressedImage({
        ...selectImage,
        imgData: newImageData,
      })
    }catch(err){
      console.log(err);
      message.error('压缩失败');
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Link href="/" className={styles.homeLink}>
          <a>返回列表页</a>
        </Link>
        <h1>blob 例子</h1>
        <div>
          <Button onClick={handleGetImgByXHR}>通过XHR获取图片</Button>
          <Button onClick={handleGetImgByFetch}>通过fetch获取图片</Button>
          <Button onClick={handleChunkUpload}>分片上传</Button>
          <Button onClick={handleDownload}>下载文件</Button>
          <div className={styles.imgWrap}>
            {imgUrl && <Image src={imgUrl} alt='pic' layout='fill' /> }
          </div>

          <div>
            <input type="file" accept="image/*" onChange={loadFile}></input>
            <div className={styles.imgWrap}>
              {compressedImage && <Image src={compressedImage.imgData} alt='pic' layout='fill' /> }
            </div>
            <div> 清晰度：<Slider defaultValue={ratio} value={ratio} onChange={handleCompressRatioChange} /></div>
            <Button onClick={handleCompress}>一键压缩图片（清晰度90%）</Button>
            <Button onClick={handleUploadByBase64} loading={uploading}>base64上传</Button>
            <Button onClick={handleUploadByFormData}>formData上传</Button>
          </div>
        </div>
      </div>
    </>
  )
}
