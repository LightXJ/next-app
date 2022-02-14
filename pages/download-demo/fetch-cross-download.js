
import { Button, message, Progress } from 'antd';
import { useState } from 'react';
import styles from './index.module.css';

// const urlThreeCross = 'https://www.baidu.com/img/PC_880906d2a4ad95f5fafb2e540c5cdad7.png';
const urlThreeCross = 'http://172.19.160.73:3000/download/baidu/img/PC_880906d2a4ad95f5fafb2e540c5cdad7.png';


export default function Download(){

  const [ loadingPercent, setLoadingPercent ] = useState(0);
  const [ downloading, setDownLoading ] = useState(false);


  const download = (url) => {
    const aElem = document.createElement('a');
    aElem.href = url;
    aElem.download = 'a.png';
    document.body.append(aElem);
    aElem.click();
    document.body.removeChild(aElem);
    window.URL.revokeObjectURL(url);
  }

  const handleDownloadThreeSame = async () => {
    setLoadingPercent(0);
    setDownLoading(true);
    try{
      const response = await fetch(urlThreeCross);

      // 获取下载进度
      const reader = response.body.getReader();
      // Step 2：获得总长度（length）
      const contentLength = +response.headers.get('Content-Length');

      let receivedLength = 0; // 当前接收到了这么多字节
      let chunks = []; // 接收到的二进制块的数组（包括 body）
      while(true) {
        const {done, value} = await reader.read();

        if (done) {
          break;
        }

        chunks.push(value);
        receivedLength += value.length;

        setLoadingPercent((receivedLength/contentLength * 100).toFixed());
      }
      setDownLoading(false);
      let blob = new Blob(chunks);
      let url = window.URL.createObjectURL(blob);
      download(url);
      
    }catch(error){
      setDownLoading(false);
      setLoadingPercent(0)
      message.error('下载失败');
    }

  }


  return (
    <div className={styles.pageContainer}>
      <div className={styles.demoContainer}>
        <h1>示例三：XMLHttpRequest/fetch下载能被浏览器打开的文件，三方图片，未设置CORS响应头</h1>
        <p>将blob内容转换为blobURL或者dataURL</p>
        <code className={styles.code}>三方图片：{urlThreeCross}</code>
        <div>
          下载进度：<Progress percent={loadingPercent} />
        </div>
        <Button type='primary' disabled={downloading} loading={downloading} onClick={handleDownloadThreeSame}>下载跨域成功</Button>
        <br />
        <a href={urlThreeCross} download="a.png">
          <Button type="primary">单纯a+download下载成功</Button>
        </a>
      </div>
    </div>
  )
}