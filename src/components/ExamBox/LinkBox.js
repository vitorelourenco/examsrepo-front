import styled from "styled-components";
import SubmitButton from "./SubmitButton";
import {BiCopy} from 'react-icons/bi';

export default function LinkBox({link, setLink, isSubmitDisabled}) {

  const onLinkChange = (e) => {
    setLink(e.target.value);
  };

  return (
    <LinkWrapper>
      <BiCopy />
      <input type="text" value={link} onChange={onLinkChange}/>
      <SubmitButton isSubmitDisabled={isSubmitDisabled}/>
    </LinkWrapper>
  );
}

const LinkWrapper = styled.div`
  border: 1px solid white;
  background-color: #eee;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #333;
  height: 300px;
  height: 253px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 50px;
  align-items: center;
  gap: 10px;

  & > svg{
    font-size: 30px;
  }

  [type="text"]{
    width: 95%;
  }
`;

