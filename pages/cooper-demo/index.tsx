import React, { useState, useRef, useCallback } from 'react';
import { Upload, Modal, Button, message } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";


const maxFileSize = 1; // 图片最大1M


const Demo = (props) => {
  const [ previewVisible, setPreviewVisible ] = useState(false); // 预览模态框
  const [ previewImage, setPreviewImage ] = useState(''); // 预览图片地址
  const [srcCropper, setSrcCropper ] = useState(''); // 当前图片路径
  const [selectImgName, setSelectImgName] = useState(''); // 当前文件名称
  const [editImageModalVisible, setEditImageModalVisible] = useState(false); // 裁剪模态框
  const [saveImageLoading, setSaveImageLoading] = useState(false); //保存裁剪后图片loading
  const [fileList, setFileList] = useState([]);
  const [cropperDataBlob, setCropperDataBlob] = useState<Blob>();
  const cropperRef = useRef<HTMLImageElement>(null);
  

  const uploadBefore = (file: UploadFile) => {
    // 1. 校验文件大小
    const fileSize = maxFileSize * 1024 * 1024;
    if (file && (file.size as number > fileSize)) {
        file.status = 'error'; // eslint-disable-line
        file.response = `上传文件大小不能超过: ${fileSize / (1024 * 1024)}MB`; // eslint-disable-line
        message.error({content: file.response || ''});
        return false;
    }
     // 1. FileReader
    // - FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
    // - 事件 FileReader.onload，在读取操作完成时触发
    // - 方法 
    const reader = new FileReader();
    // Image()函数将会创建一个新的HTMLImageElement实例, Image(width, height)
    // 它的功能等价于 document.createElement('img')
    const image = new Image(); 

    reader.readAsDataURL(file as RcFile); //开始读取指定的Blob中的内容。一旦完成，result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容。
    // 1. img.onload
    // - img.onload 是回调函数，当img载入完成，就执行这个函数
    // - 当image的src发生改变，浏览器就会跑去加载这个src里的资源。这个操作是异步的，就是说，js不会傻傻地在原地等待图片的加载，而是继续读代码，直到图片加载完成，触发onload事件，js才会回来执行onload里面的内容。
    
    // 2. reader.onload
    // - 当 FileReader 读取文件的方式为  readAsArrayBuffer, readAsBinaryString, readAsDataURL 或者 readAsText 的时候，会触发一个 load 事件。从而可以使用  FileReader.onload 属性对该事件进行处理。
    
    reader.onload = e => { // onload 事件在图片加载完成后立即执行。
      image.src = reader.result as string;
      image.onload = () => {
        setSrcCropper(e.target?.result as string);
        setSelectImgName(file.name);
        setEditImageModalVisible(true);
      };
    };
    return false; // 返回false,阻止文件上传
  };

  const handleSaveImg = useCallback(()=>{
    if(srcCropper){
      setSaveImageLoading(true);

      const formData = new FormData();
      // 第三个参数为文件名，可选填. formData.append(name, value, filename);vlaue只支持blob string File
        formData.append('file', cropperDataBlob as Blob, selectImgName);
        for(const [key, value] of formData){
          console.log(value);
        }
        // TODO: 把blob数据发送到后端
        setSaveImageLoading(false);
        setEditImageModalVisible(false);
    }
  }, [cropperDataBlob, selectImgName, srcCropper])

  const onCrop = ()=>{
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    cropper.getCroppedCanvas().toBlob((blob)=>{
      setCropperDataBlob(blob);
    });
  }


  return (
    <div>
      <Upload
         listType="picture-card"
         showUploadList={{
          showPreviewIcon: true,
          showDownloadIcon: true,
         }}
         fileList={fileList}
         action={'plugin/address'}
         beforeUpload={uploadBefore}
         onPreview={()=>{
            setPreviewVisible(true)
         }}
        onRemove={()=>{
          setFileList([])
        }}
      >
        <div style={{ marginTop: 8 }}></div>
      </Upload>
      <Modal
        className="upload_cropper_modal"
        open={editImageModalVisible}
        width={820}
        onCancel={()=>setEditImageModalVisible(false)}
        title="请选择裁剪区域"
        footer={[
          <Button key="1" type="primary" loading={saveImageLoading} onClick={handleSaveImg}>
            确定
          </Button>,
          <Button key="2" onClick={() => {
            setEditImageModalVisible(false)
            setSaveImageLoading(false);
          }}>
            取消
          </Button>
        ]}
      >
        <Cropper
          src={srcCropper}
          ref={cropperRef}
          crop={onCrop}
          preview=".uploadCrop"
          viewMode={1} // 定义cropper的视图模式
          zoomable={false} // 是否允许放大图像
          // movable
          guides={false} // 显示在裁剪框上方的虚线
          background={false} // 是否显示背景的马赛克
          rotatable={false} // 是否旋转
          autoCropArea={1} // 默认值0.8（图片的80%）。--0-1之间的数值，定义自动剪裁区域的大小
          style={{ width: '100%', height: '400px' }}
          aspectRatio={1152 / 382} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
          // cropBoxResizable={false} // 默认true ,是否允许拖动 改变裁剪框大小
          // cropBoxMovable  // 是否可以拖拽裁剪框 默认true
          dragMode="move" // 拖动模式, 默认crop当鼠标 点击一处时根据这个点重新生成一个 裁剪框，move可以拖动图片，none:图片不能拖动
          center
        ></Cropper>
      </Modal>

      {/* 预览框 */}
      <Modal open={previewVisible} footer={null} onCancel={() => {setPreviewImage(false)}}>
        <img alt="" style={{ width: '100%' }} src={previewImage} />
      </Modal>

    </div>
    
  )
}

export default Demo;