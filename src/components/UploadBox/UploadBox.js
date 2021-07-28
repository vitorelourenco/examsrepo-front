import { useRef, useState } from "react";

import { FileDrop } from "react-file-drop";
import styled from "styled-components";

import useDragAndDrop from "../../hooks/useDragAndDrop";
import { uploadToAWS } from "../../utils/aws";
import isThisAFile from "../../utils/isThisAFile";

export default function UploadBox() {
  const [file, setFile] = useState(null);

  const refDropArea = useRef(null);
  const refFileInput = useRef(null);

  const onTargetClick = () => refFileInput.current.click();
  const onFileDrop = (files) => {
    if (files.length > 1 ) return alert("You can't upload more than one file");
    const file = files[0];
    isThisAFile(file)
    .then(() => setFile(file))
    .catch(() => alert("You can't upload a dir"))
  };

  const onFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    
    uploadToAWS(file)
      .then(({ data }) => {
        alert(data.url);
        setFile(null);
      })
      .catch((err) => alert(err));
  };

  const isSubmitDisabled = !file;

  useDragAndDrop();

  return (
    <Form ref={refDropArea} onSubmit={onFormSubmit} >
      <Input ref={refFileInput} onChange={onFileInputChange} type="file" />
      <FileDrop
        frame={refDropArea?.current || window.document}
        onDrop={onFileDrop}
        onTargetClick={onTargetClick}
      >
        <p className="upload--text">Drop a file or click me</p>
        {file ? <p className="upload--fileName">Current File: {file?.name}</p> : null}
      </FileDrop>
      <Button disabled={isSubmitDisabled} type="submit" id="send-drag-and-drop">
        Upload
      </Button>
    </Form>
  );
}

const Form = styled.form`
  border: 1px solid white;

  .file-drop{
    height: 200px;
    cursor: pointer;
  }

  .file-drop-target {
    height: 100%;
  }

  .file-drop-target{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .upload--text{
      font-size: 28px;
    }

    .upload--fileName{
      font-size: 14px;
    }
  }

`;

const Input = styled.input`
  display: none;
`;

const Button = styled.button`
  :disabled {
    filter: brightness(0.3);
    cursor: auto;
  }
  cursor: pointer;
  margin: 10px auto;
  display: block;
`;
