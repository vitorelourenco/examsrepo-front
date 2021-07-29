import styled from "styled-components";
import UploadBox from "../UploadBox/UploadBox"

export default function Create(){
  return(
    <Form>
      <input type="text"/>
      <div className="create--fileBox">
        <UploadBox/>
      </div>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;

  .create--fileBox{
    flex: 0 0 300px;
  }
`;
