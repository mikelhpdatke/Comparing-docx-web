import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Uploader = (props) => {
  const [fileList, updateFileList] = useState([]);
  const acceptTypeList = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  const propsUpload = {
    fileList,
    beforeUpload: (file) => {
      if (!acceptTypeList.includes(file.type)) {
        message.error(`${file.name} Tập tin tải lên chưa đúng định dạng docx hoặc .doc`);
        return false;
      }
      // return file.type === 'image/png';
      return true;
    },
    onChange: (info) => {
      //   console.log(info.fileList);
      // file.status is empty when beforeUpload return false
      updateFileList(info.fileList.filter((file) => !!file.status));
    },
  };
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Upload png only</Button>
    </Upload>
  );
};

export default Upload;
