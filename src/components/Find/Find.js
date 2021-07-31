import SelectItem from "../Create/SelectItem"
import { GiDiploma } from "react-icons/gi";
import useIntialDegreeOptions from "../../hooks/useInitialDegreeOptions";
import { useState } from "react";
import styled from "styled-components";
import PickOne from "../PickOne/PickOne";
import { Link } from "react-router-dom";
import { HiBookOpen } from "react-icons/hi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FindByCourse from "./FindByCourse";
import FindByInstructor from "./FindByInstructor";

export default function Find(){
  const [degrees, setDegrees] = useState([]);
  const [categories, setCategories] = useState([]);
  
  console.log(categories);
  const [examOptions, setExamOptions] = useState({
    degreeId: "",
    categoryId: "",
    instructorId: "",
    courseId: "",
    name: "",
  });

  useIntialDegreeOptions(
    examOptions,
    setDegrees,
    setCategories,
    setExamOptions
  );

  const {findBy} = useParams();

  return (
    <Wrapper>
      <Spacer>
        <SelectItem optionsArr={degrees} htmlLabel={<GiDiploma/>} htmlId="findDegree" />
      </Spacer>
      {findBy ? findBy === "instructor" ? <FindByInstructor/> : <FindByCourse/> : <Choices/>}

    </Wrapper>
  )
}

function Choices(){
  return (
    <PickOne>
      <Link to="/find/instructor">
        <FaChalkboardTeacher/>
      </Link>
      <Link to="/find/course">
        <HiBookOpen/>
      </Link>
    </PickOne>
  )
}

const Wrapper = styled.div`
  select{
    width: 100%;
  }
`;  

const Spacer = styled.div`
  padding: 20px;
`;