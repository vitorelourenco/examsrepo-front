import styled from 'styled-components';

import FileDropBox from '../UploadBox/UploadBox';

export default function Home(){
  return(
    <>
      <StyleFrame>
        <FileDropBox />
      </StyleFrame>
    </>
  )
}

const StyleFrame = styled.div`
  width: 300px;
`;