import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import TableStyle from "../Utils/TableStyle";
import { HiBookOpen } from "react-icons/hi";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function FindByCourse({degreeId}) {
  const [periods, setPeriods] = useState([]);

  const coursesURL = useMemo(
    () => new URL(`courses/${degreeId}/byPeriod`, BASE_URL),
    [degreeId]
  );

  useEffect(() => {
    if (!degreeId) return null;

    axios
      .get(coursesURL)
      .then(({ data }) => setPeriods(data))
      .catch((err) => {
        alert(err);
        setPeriods([]);
      });
  }, [degreeId, coursesURL]);

  if (!degreeId) return null;

  return (
    <> 
      <Periods periods={periods} />
    </>
  );
}

function Periods({ periods }) {
  return (
    <>
      {periods.map((period) => (
        <PeriodTable key={period.id} period={period} />
      ))}
    </>
  );
}

function PeriodTable({ period }) {
  return (
    <>
      <PeriodHeader>Period: {period.name}</PeriodHeader>

      <TableStyle>
        <thead>
          <tr>
            <th>
              <HiBookOpen />
            </th>
          </tr>
        </thead>
        <tbody>
          <Courses key={period.id} courses={period.courses} />
        </tbody>
      </TableStyle>
    </>
  );
}

const PeriodHeader = styled.h2`
  font-size: 20px;
  margin: 5px auto;
  text-align: center;
`;

function Courses({ courses }) {
  return (
    <>
      {courses.map((course) => (
        <Row key={course.id} course={course} />
      ))}
    </>
  );
}

function Row({ course }) {
  function CellLink({ content }) {
    return (
      <Link to={`/course/${course.id}`}>
        {content}
      </Link>
    );
  }
  return (
    <tr>
      <td>{<CellLink content={course.name} />}</td>
    </tr>
  );
}
