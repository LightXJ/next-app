export async function queryScheduleOverview() {
  return new Promise((resolve, reject)=>{
    const delayTime = Math.random() * 5000;
    console.log('请求了', delayTime)
    setTimeout(()=>{
      if(delayTime>2000){
        console.log('报错了', delayTime)
        reject('d')
      }else{
        console.log('响应了', delayTime);
        resolve(delayTime);
      }
    }, delayTime)
  })
  .then(res=>res)
  .catch(err=>{
    throw new Error(err)
  })
}

export default null;