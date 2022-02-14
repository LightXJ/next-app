import { useRef } from "react"

export default function Home(){
  const fileRef = useRef();

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(){
      const content = reader.result;
      console.log(content);
    }
    reader.readAsText(file);
  } 

  return (
    <div>
      <input type="file" ref={fileRef} onChange={handleFileChange}/>
    </div>
  )
}