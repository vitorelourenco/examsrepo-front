import styled from "styled-components";

export default function LayoutInterface(props){
  return (
    <>
      <Main>
        {props.children}
      </Main>
      <Quiet />
    </>
  )
}

const Main = styled.main`
  margin: 100px auto;
  background-color: #333;  
  width: 768px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(255,255,255, 0.5);
`;

function ssshhhhh(props){
  return (
    <p {...props}>ssshhhhh...</p>
  )
}

const Quiet = styled(ssshhhhh)`
  text-align: center;
  font-size: 10px;
  user-select: none;
`;
