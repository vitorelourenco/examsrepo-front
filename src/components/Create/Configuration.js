import styled from "styled-components";
import Degree from "./Degree";

export default function Configuration({
  examOptions,
  setExamOptions,
  degrees,
  setDegrees,
  degreesURL,
}) {
  return (
    <Wrapper>
      <Degree
        {...{ examOptions, setExamOptions, degrees, setDegrees, degreesURL }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;
