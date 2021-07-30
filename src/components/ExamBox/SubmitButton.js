import styled from "styled-components";
import { GrSend } from "react-icons/gr";

export default function SubmitButton({ isSubmitDisabled }) {
  return (
    <Wrapper>
      <Button disabled={isSubmitDisabled} type="submit">
        <GrSend />
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #333;
  padding: 1px;
  border-radius: 5px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 51px;
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
