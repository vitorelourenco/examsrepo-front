import { useRef, useState } from "react";

import { FileDrop } from "react-file-drop";
import styled from "styled-components";
import {MdInsertDriveFile} from 'react-icons/md'
import {FaHandRock} from 'react-icons/fa'
import {GiClick} from 'react-icons/gi'
import {GrSend} from 'react-icons/gr'

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
    <UploadWrapper ref={refDropArea} onSubmit={onFormSubmit} >
      <Input ref={refFileInput} onChange={onFileInputChange} type="file" />
      <FileDrop
        frame={refDropArea?.current || window.document}
        onDrop={onFileDrop}
        onTargetClick={onTargetClick}
      >
        <p className="upload--text"><FaHandRock/><MdInsertDriveFile/><br/><GiClick/></p>
        {file ? <p className="upload--fileName"><MdInsertDriveFile/> {file?.name}</p> : null}
      </FileDrop>
      <div className="upload--submit">
        <Button disabled={isSubmitDisabled} type="submit" id="send-drag-and-drop">
          <GrSend/>
        </Button>
      </div>
    </UploadWrapper>
  );
}

const UploadWrapper = styled.div`
  border: 1px solid white;
  background-color: #eee;
  border-radius: 5px;
  color: #333;

  .file-drop{
    height: 200px;
    cursor: pointer;
  }

  .file-drop-target {
    height: 100%;
  }

  .upload--submit {
    background-color: #333;
    padding: 1px;
    border-radius: 5px;
  }

  .file-drop-target{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .upload--text{
      font-size: 28px;
      text-align: center;
      line-height: 40px;
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

  background-color: greenyellow;
  border: 2px groove white;
  padding: 5px 15px 0 15px;
  cursor: pointer;
  margin: 10px auto;
  display: block;
  border-radius: 4px;
`;
