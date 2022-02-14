import { Button, message } from 'antd';
import styles from './index.module.css';

const urlThreeCross = 'http://localhost:3000/download/big.pdf';

export default function Download(){

  const download = async ({ url, chunkSize, poolLimit = 1 }) => {
    const contentLength = await getContentLength(url);
    const chunks = typeof chunkSize === "number" ? Math.ceil(contentLength / chunkSize) : 1;
    const results = await asyncPool(
      poolLimit,
      [...new Array(chunks).keys()],
      (i) => {
        let start = i * chunkSize;
        let end = i + 1 == chunks ? contentLength - 1 : (i + 1) * chunkSize - 1;
        return getBinaryContent(url, start, end, i);
      }
    );
    const sortedBuffers = results
      .map((item) => new Uint8Array(item.buffer));
    return concatenate(sortedBuffers);
  }

  const handleDownload = async () =>{
    download({
      url: urlThreeCross,
      chunkSize: 10 * 1024 * 1024,
      poolLimit: 6,
    }).then((buffers) => {
      console.log("多线程下载结束: " + +new Date());
      saveAs({ buffers, name: "bigfile", mime: "application/pdf" });
    }).catch(()=>{
      message.error('下载失败');
    })
  }


  function getContentLength(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("HEAD", url);
      xhr.send();
      xhr.onload = function () {
        resolve(xhr.getResponseHeader("Content-Length"));
      };
      xhr.onerror = reject;
    });
  }

  async function asyncPool(limit, array, iteratorFn){
      const arrLen = array.length;
      const ret = [];  // 存放所有的任务
      const executing = [];  // 存放执行中的任务

      for(let i=0; i<array.length; i++){

        const p =((i)=>Promise.resolve().then(()=>iteratorFn(array[i])))(i);
        ret.push(p);
        
        if(limit <= arrLen){
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
        
            executing.push(e);
            if(executing.length >= limit){
              await Promise.race(executing);
            }
        }
      }
      
      return Promise.all(ret)
    }

  function getBinaryContent(url, start, end, i) {
    return new Promise((resolve, reject) => {
      try {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("range", `bytes=${start}-${end}`); // 请求头上设置范围请求信息
        xhr.responseType = "arraybuffer"; // 设置返回的类型为arraybuffer
        xhr.onload = function () {
          if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
            resolve({
              index: i, // 文件块的索引
              buffer: xhr.response, // 范围请求对应的数据
            });
          }else{
            reject(new Error(xhr.statusText || '下载失败'));
          }
        };
        xhr.send();
      } catch (err) {
        reject(new Error(err));
      }
    });
  }

  function concatenate(arrays) {
    
    if (!arrays.length) return null;
    let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
    let result = new Uint8Array(totalLength);
    let length = 0;
    for (let array of arrays) {
      result.set(array, length);
      length += array.length;
    }
    return result;
  }

  function saveAs({ name, buffers, mime = "application/octet-stream" }) {
    const blob = new Blob([buffers], { type: mime });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = name || Math.random();
    a.href = blobUrl;
    a.click();
    URL.revokeObjectURL(blob);
  }


  return (
    <div className={styles.pageContainer}>
      <div className={styles.demoContainer}>
        <h1>下载大文件</h1>
        <code className={styles.code}>大文件：{urlThreeCross}</code>
        <Button type='primary' onClick={handleDownload}>下载跨域成功</Button>
      </div>
    </div>
  )
}