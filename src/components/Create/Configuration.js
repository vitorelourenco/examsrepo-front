import styled from "styled-components";
import Degree from "../Selection/Degree";
import Course from "./Course";
import Instructor from "./Instructor";
import Category from "./Category";
import Name from "./Name";

export default function Configuration({
  examOptions,
  setExamOptions,
  degrees,
  setDegrees,
  degreesURL,
  courses,
  instructors,
  categories,
}) {
  return (
    <Wrapper>
      <Degree
        {...{ hasAdd:true, examOptions,setExamOptions, degrees, setDegrees, degreesURL }}
      />
      <Course {...{ examOptions, setExamOptions, courses}}/>
      <Instructor {...{ examOptions, setExamOptions, instructors}}/>
      <Category {...{ examOptions, setExamOptions, categories}}/>
      <Name {...{examOptions, setExamOptions}} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-right: 50px;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;
