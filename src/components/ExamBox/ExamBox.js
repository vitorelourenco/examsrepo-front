import styled from "styled-components";
import UploadBox from "./UploadBox";
import LinkBox from "./LinkBox";
import { BsUpload } from "react-icons/bs";
import { HiLink } from "react-icons/hi";

export default function ExamBox({ file, setFile, submitType, setSubmitType,examOptions, isSubmitDisabled , link, setLink}) {
  return (
    <Wrapper>
      <TypeWrapper>
        <TypeBox
          picked={submitType === "upload"}
          onClick={() => setSubmitType("upload")}
        >
          <BsUpload />
        </TypeBox>
        <TypeBox
          picked={submitType === "link"}
          onClick={() => setSubmitType("link")}
          style={{ borderTopRightRadius: "5px" }}
        >
          <HiLink />
        </TypeBox>
      </TypeWrapper>
      {submitType === "upload" ? (
        <UploadBox {...{ file, setFile, isSubmitDisabled }} />
      ) : (
        <LinkBox {...{ link, setLink, isSubmitDisabled }}/>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 0 0 300px;
`;

const TypeBox = styled.div`
  background-color: ${(props) => (props.picked ? "#eee" : "#333")};
  color: ${(props) => (props.picked ? "#333" : "#eee")};
  cursor: pointer;
`;

const TypeWrapper = styled.div`
  font-size: 20px;
  display: flex;

  & > * {
    flex: 1 1 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`;
