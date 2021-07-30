import styled from "styled-components";
import UploadBox from "../UploadBox/UploadBox";

export default function ExamBox({ file, setFile }) {
  return (
    <Wrapper>
      <UploadBox {...{ file, setFile }} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 0 0 300px;
`;
