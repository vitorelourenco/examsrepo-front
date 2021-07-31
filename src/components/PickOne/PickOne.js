import styled from "styled-components"

export default function PickOne(props){
  return (
    <Wrapper>
      {[...props.children]}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  font-size: 200px;

  & > * {
    flex-basis: ${props=>{
      const nChildren = props.children.length;
      if (nChildren <= 1) return "100%";
      const percent = 100/nChildren;
      return percent.toFixed(2)+"%";
    }};
    flex-grow:1;
    flex-shrink: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    cursor: pointer;
    &:hover{
      background-color: #eee;
      color: #333;
      outline: 10px solid greenyellow;
    }
  }
`
