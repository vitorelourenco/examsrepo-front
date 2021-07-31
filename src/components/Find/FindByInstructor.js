import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TableStyle from "../Utils/TableStyle";
import {IoDocuments} from 'react-icons/io5'
import { FaChalkboardTeacher } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function FindByInstructor({degreeId}) {
  const [instructors, setInstructors] = useState([]);

  const instructorsURL = useMemo(()=>new URL(`instructors/${degreeId}`, BASE_URL), [degreeId])

  useEffect(() => {
    if (!degreeId) return;
    axios
      .get(instructorsURL)
      .then(({ data }) => setInstructors(data))
      .catch((err) => {
        alert(err);
        setInstructors([]);
        console.log("lalala")
      });
  }, [degreeId, instructorsURL]);

  if (!degreeId) return null;

  return (
    <TableStyle>
      <thead>
        <tr>
          <th><FaChalkboardTeacher/></th>
          <th><IoDocuments/></th>
        </tr>
      </thead>
      <tbody>
        {instructors.map((instructor) => (
          <Row key={instructor.id} instructor={instructor} />
        ))}
      </tbody>
    </TableStyle>
  );
}



function Row({ instructor }) {
  function CellLink({content}){
    return(
      <Link to={`/instructor/${instructor.id}`}>
        {content}
      </Link>
    )
  }
  return (
    <tr>
        <td>{<CellLink content={instructor.name}/>}</td>
        <td>{<CellLink content={instructor.exams?.length}/>}</td>
    </tr>
  );
}
