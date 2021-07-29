import styled from 'styled-components';
import {MdAssignment, MdSearch} from 'react-icons/md';
import FileDropBox from '../UploadBox/UploadBox';

export default function Home(){
  return(
    <HomeWrapper>
      <div>
        <MdAssignment/>
      </div>
      <div>
        <MdSearch/>
      </div>
    </HomeWrapper>
  )
}

const HomeWrapper = styled.div`
  display: flex;
  font-size: 200px;
  & > div {
    width: 50%;
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
`;