import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import TableStyle from "../Utils/TableStyle";
import { HiBookOpen } from "react-icons/hi";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Instructor() {
  const [exams, setExams] = useState([]);

  const {instructorId} = useParams()
  const examURL = useMemo(()=>new URL(`exams/instructor/${instructorId}`, BASE_URL), [instructorId])


  useEffect(() => {
    axios
      .get(examURL)
      .then(({ data }) => setExams(data))
      .catch((err) => {
        alert(err);
        setExams([]);
      });
  }, [instructorId, examURL]);

  if (!instructorId) return null;

  return (
    <TableStyle>
      <thead>
        <tr>
          <th>A</th>
          <th><HiBookOpen /></th>
        </tr>
      </thead>
      <tbody>
        {exams.map((exam) => (
          <Row key={exam.id} exam={exam} />
        ))}
      </tbody>
    </TableStyle>
  );
}

function Row({ exam }) {
  function CellLink({content}){
    return(
      <a target="_blank" rel="noreferrer" href={`${exam.fileLink}`}>
        {content}
      </a>
    )
  }
  return (
    <tr>
        <td>{<CellLink content={exam.name}/>}</td>
        <td>{<CellLink content={exam.course.name}/>}</td>
    </tr>
  );
}
