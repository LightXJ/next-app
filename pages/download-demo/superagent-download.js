
import { Button, message, Progress } from 'antd';
import { useState } from 'react';
import styles from './index.module.css';

const urlThreeSame = 'http://s3plus.meituan.net/push-user/moviemeta/market/1c63cd6f5bad360ab399f4b1a15d8087_1645520154707_3.csv?AWSAccessKeyId=8fe0560d997d4c869797a710cdc280d7&Expires=1645570220&Signature=J8DH9pG7d3CXFN%2F7L3zlTP96TI4%3D';


export default function Download(){

  const [ loadingPercent, setLoadingPercent ] = useState(0);
  const [ downloading, setDownLoading ] = useState(false);

  const download = (url) => {
    const aElem = document.createElement('a');
    aElem.href = url;
    aElem.download = 'file.pdf';
    document.body.append(aElem);
    aElem.click();
    document.body.removeChild(aElem);
    window.URL.revokeObjectURL(url);
  }

  const handleDownloadThreeSame = async () => {
    setLoadingPercent(0);
    setDownLoading(true);
    try{
      const response = await fetch(urlThreeSame);

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

        setLoadingPercent((receivedLength/contentLength * 100).toFixed);
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
        <h1>示例三：superagent下载, 如果是跨域资源设置了CORS响应头</h1>
        <p>将blob内容转换为blobURL或者dataURL</p>
        <code className={styles.code}>同域：{urlThreeSame}</code>
        <div>
          下载进度：<Progress percent={loadingPercent} />
        </div>
        <Button type='primary' disabled={downloading} loading={downloading} onClick={handleDownloadThreeSame}>下载同域成功</Button>
      </div>
    </div>
  )
}