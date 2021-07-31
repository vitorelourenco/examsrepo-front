import { Link } from 'react-router-dom';

import {RiGalleryUploadFill} from 'react-icons/ri';
import {GoSearch} from 'react-icons/go';
import PickOne from '../PickOne/PickOne';

export default function Home(){
  return(
      <PickOne>
        <Link to="/create">
          <RiGalleryUploadFill/>
        </Link>
        <Link to="/find">
          <GoSearch/>
        </Link>
      </PickOne>
  )
}
