import { Link } from 'react-router-dom';

import styled from 'styled-components';
import {RiGalleryUploadFill} from 'react-icons/ri';

export default function Home(){
  return(
    <HomeWrapper>
      <Link to="/create">
        <RiGalleryUploadFill/>
      </Link>
      <Link to="/">
      </Link>
    </HomeWrapper>
  )
}

const HomeWrapper = styled.div`
  display: flex;
  font-size: 200px;
  & > a {
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