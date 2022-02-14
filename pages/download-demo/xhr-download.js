
import { Button, message, Progress } from 'antd';
import { useState } from 'react';
import styles from './index.module.css';

const urlThreeSame = 'http://localhost:3000/api/download/bigfile';
const urlThreeCross = 'http://localhost:3005/a.png'; 
const urlThreeWithCors = 'http://localhost:3006/a.png';

export default function Download(){

  const [loadingPercent, setLoadingPercent] = useState(0);

  const download = (url) => {
    const aElem = document.createElement('a');
    aElem.href = url;
    aElem.download = 'a.pdf';
    document.body.append(aElem);
    aElem.click();
    document.body.removeChild(aElem);
  }

  const handleDownloadThreeSame = () => {
    var xhr = new XMLHttpRequest();    
    xhr.open("get", urlThreeSame, true);  
    xhr.responseType = "blob"; 
    xhr.onprogress = (e)=>{
      setLoadingPercent(((e.loaded / e.total) * 100).toFixed());
    }
    xhr.onreadystatechange = () =>{
      if(xhr.readyState === XMLHttpRequest.DONE){
        if( xhr.status === 200){
          var blob = xhr.response;  // this.response也就是请求的返回就是Blob对象
          let url = window.URL.createObjectURL(blob);
          download(url);
          setLoadingPercent(100);
        }else{
          message.error('下载失败');
        }
      }
    }
    xhr.send(); 
    setLoadingPercent(10);
  }

  const handleDownloadThreeCross = () => {
    var xhr = new XMLHttpRequest();    
    xhr.open("get", urlThreeCross, true);
    xhr.responseType = "blob";
    xhr.onreadystatechange = () =>{
      if(xhr.readyState === XMLHttpRequest.DONE){
        if( xhr.status === 200){
          var blob = xhr.response;  // this.response也就是请求的返回就是Blob对象
          let url = window.URL.createObjectURL(blob);
          download(url);
        }else{
          message.error('下载失败');
        }
      }
    }
   
    xhr.send(); 
  }

  const handleDownloadThreeCors = () => {
    var xhr = new XMLHttpRequest();    
    xhr.open("get", urlThreeWithCors, true);
    xhr.responseType = "blob";
    xhr.onreadystatechange = () =>{
      if(xhr.readyState === XMLHttpRequest.DONE){
        if( xhr.status === 200){
          var blob = xhr.response;  // this.response也就是请求的返回就是Blob对象
          let url = window.URL.createObjectURL(blob);
          download(url);
        }else{
          message.error('下载失败');
        }
      }
    }
    xhr.send(); 
  }
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.demoContainer}>
        <h1>示例三：XMLHttpRequest/fetch下载能被浏览器打开的文件，如果是跨域资源设置了CORS响应头</h1>
        <p>将blob内容转换为blobURL或者dataURL</p>
        <code className={styles.code}>同域：{urlThreeSame}</code>
        <code className={styles.code}>跨域：{urlThreeCross}</code>
        <code className={styles.code}>跨域(cors):{urlThreeWithCors}</code>
        <div>
          下载进度：<Progress percent={loadingPercent}></Progress>
        </div>
        <Button type='primary' onClick={handleDownloadThreeSame}>下载同域成功</Button>
        <Button type='default' onClick={handleDownloadThreeCross}>下载跨域失败</Button>
        <Button type='primary' onClick={handleDownloadThreeCors}>下载跨域cors成功</Button>
      </div>
    </div>
  )
}