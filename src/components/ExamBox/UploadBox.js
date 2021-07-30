import { useRef } from "react";

import { FileDrop } from "react-file-drop";
import styled from "styled-components";
import {MdInsertDriveFile} from 'react-icons/md'
import {FaHandRock} from 'react-icons/fa'
import {GiClick} from 'react-icons/gi'
import SubmitButton from "./SubmitButton";

import useDragAndDrop from "../../hooks/useDragAndDrop";
import isThisAFile from "../../utils/isThisAFile";

export default function UploadBox({file, setFile,isSubmitDisabled}) {

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

  useDragAndDrop();

  return (
    <UploadWrapper ref={refDropArea} >
      <Input ref={refFileInput} onChange={onFileInputChange} type="file" />
      <FileDrop
        frame={refDropArea?.current || window.document}
        onDrop={onFileDrop}
        onTargetClick={onTargetClick}
      >
        <p className="upload--text"><FaHandRock/><MdInsertDriveFile/><br/><GiClick/></p>
        {file ? <p className="upload--fileName"><MdInsertDriveFile/> {file?.name}</p> : null}
      </FileDrop>
      <SubmitButton isSubmitDisabled={isSubmitDisabled}/>
    </UploadWrapper>
  );
}

const UploadWrapper = styled.div`
  border: 1px solid white;
  background-color: #eee;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #333;
  height: 253px;
  position: relative;

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


