import { message } from "antd";

export default function Demo(){

  const handleSubmit = (e) =>{
    e.preventDefault();
    const myFormData = new FormData(e.target);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/formData");
    xhr.onload = ()=>{
      if(xhr.status === 200 && xhr.responseText ){
        message.success('提交成功');
      }else{
        message.error('提交失败');
      }
    }
    xhr.send(myFormData);
  }
  return (
    <div>
      FormData Demo
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="email">
            邮箱
            <input type="text" name="email" />
          </label>
          <label htmlFor="passport">
            <input type="password" name="passport" />
          </label>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}