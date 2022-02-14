
import { Button, message } from 'antd';
import styles from './index.module.css';

const urlOneSame = 'http://172.19.160.73:3000/api/download/file';
const urlOneCross = 'https://dl.google.com/chrome/mac/universal/stable/CHFA/googlechrome.dmg';

const urlTwoSame = 'http://172.19.160.73:3000/api/download/image';
const urlTwoCross = 'http://172.19.160.73:3005/a.png';
const urlTwoWithCors = 'http://172.19.160.73:3006/a.png';

const urlThreeSame = 'http://172.19.160.73:3000/api/download/image';
const urlThreeCross = 'http://172.19.160.73:3005/a.png';
const urlThreeWithCors = 'http://172.19.160.73:3006/a.png';

export default function Download(){
  
  const handleDownloadOneSame = () => {
    const aElem = document.createElement('a');
    aElem.href = urlOneSame;
    aElem.click();
  }

  const handleDownloadOneCross = () => {
    const aElem = document.createElement('a');
    aElem.href = urlOneCross;
    aElem.click();
  }

  const handleDownloadTwoSame = () => {
    const aElem = document.createElement('a');
    aElem.href = urlTwoSame;
    aElem.download = '图片.jpeg';
    aElem.click();
  }

  const handleDownloadTwoCross = () => {
    const aElem = document.createElement('a');
    aElem.href = urlTwoCross;
    aElem.download = '图片.jpeg';
    aElem.click();
  }

  const handleDownloadTwoCors = () => {
    const aElem = document.createElement('a');
    aElem.href = urlTwoWithCors;
    aElem.download = '图片.jpeg';
    aElem.click();
  }


  const download = (url) => {
    const aElem = document.createElement('a');
    aElem.href = url;
    aElem.download = '图片.png';
    document.body.append(aElem);
    aElem.click();
    document.body.removeChild(aElem);
    window.URL.revokeObjectURL(url);
  }



  const handleDownloadThreeSame = () => {
    var xhr = new XMLHttpRequest();    
    xhr.open("get", urlThreeSame, true);
    xhr.responseType = "blob";
    xhr.onreadystatechange = () =>{
      if(xhr.readyState === XMLHttpRequest.DONE){
        if( xhr.status === 200){
          var blob = xhr.response;  // this.response也就是请求的返回就是Blob对象
          let url = window.URL.createObjectURL(blob);
          alert(url);
          download(url);
        }else{
          message.error('下载失败');
        }
      }
    }
    xhr.send(); 
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
        <h1>示例一：下载「能自动触发浏览器下载的url」</h1>
        <p>response header中指定了Content-Disposition为attachment</p>
        <p>response header中指定了Content-Type 为 application/octet-stream(无类型) 或者 application/zip(下载zip包时)</p>
        <p>只需要搭配a标签或者iframe就可以，不需要担心跨域问题</p>
        <code className={styles.code}>同域：{urlOneSame}</code>
        <code className={styles.code}>跨域：{urlOneCross}</code>
        <Button type='primary' onClick={handleDownloadOneSame}>下载同域</Button>
        <Button type='primary' onClick={handleDownloadOneCross}>下载跨域</Button>
      </div>

      <div className={styles.demoContainer}>
        <h1>示例二：下载能被浏览器打开的文件</h1>
        <p>无法控制响应头时，例如响应为：Content-Type为image/png</p>
        <p>a标签配合download，此属性仅适用于同源 URL。非同源URL浏览器会尝试处理，可以打开的格式就会打开</p>
        <code className={styles.code}>同域：{urlTwoSame}</code>
        <code className={styles.code}>跨域：{urlTwoCross}</code>
        <code className={styles.code}>跨域(cors):{urlTwoWithCors}</code>
        <Button type='primary' onClick={handleDownloadTwoSame}>下载同域成功</Button>
        <Button type='default' onClick={handleDownloadTwoCross}>下载跨域打开图片</Button>
        <Button type='default' onClick={handleDownloadTwoCors}>下载跨域cors打开图片</Button>
      </div>

      <div className={styles.demoContainer}>
        <h1>示例三：XMLHttpRequest/fetch下载能被浏览器打开的文件，如果是跨域资源设置了CORS响应头</h1>
        <p>将blob内容转换为blobURL或者dataURL</p>
        <code className={styles.code}>同域：{urlThreeSame}</code>
        <code className={styles.code}>跨域：{urlThreeCross}</code>
        <code className={styles.code}>跨域(cors):{urlThreeWithCors}</code>
        <Button type='primary' onClick={handleDownloadThreeSame}>下载同域成功</Button>
        <Button type='default' onClick={handleDownloadThreeCross}>下载跨域失败</Button>
        <Button type='primary' onClick={handleDownloadThreeCors}>下载跨域cors成功</Button>
      </div>
    </div>
    
  )
}