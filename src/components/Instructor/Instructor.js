import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import TableStyle from "../Utils/TableStyle";
import { HiBookOpen } from "react-icons/hi";
import styled from "styled-components";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiDiploma } from "react-icons/gi";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Instructor() {
  const [categories, setCategories] = useState([]);

  const { instructorId } = useParams();
  const examURL = useMemo(
    () => new URL(`exams/instructor/${instructorId}/byCategory`, BASE_URL),
    [instructorId]
  );

  useEffect(() => {
    axios
      .get(examURL)
      .then(({ data }) => setCategories(data))
      .catch((err) => {
        alert(err);
        setCategories([]);
      });
  }, [instructorId, examURL]);

  if (!instructorId) return null;

  return (
    <> 
      <Info>
        <h3><GiDiploma/> {categories[0]?.exams[0]?.course?.degree?.name}</h3>
        <h1><FaChalkboardTeacher/> {categories[0]?.exams[0]?.instructor?.name}</h1>
      </Info>
      <Categories categories={categories} />
    </>
  );
}

const Info = styled.div`
  font-size: 18px;
  margin: 10px;
`;

function Categories({ categories }) {
  return (
    <>
      {categories.map((category) => (
        <CategoryTable key={category.id} category={category} />
      ))}
    </>
  );
}

function CategoryTable({ category }) {
  return (
    <>
      <CategoryHeader>Category: {category.name}</CategoryHeader>

      <TableStyle>
        <thead>
          <tr>
            <th>A</th>
            <th>
              <HiBookOpen />
            </th>
          </tr>
        </thead>
        <tbody>
          <Exams key={category.id} exams={category.exams} />
        </tbody>
      </TableStyle>
    </>
  );
}

const CategoryHeader = styled.h2`
  font-size: 20px;
  margin: 5px auto;
  text-align: center;
`;

function Exams({ exams }) {
  return (
    <>
      {exams.map((exam) => (
        <Row key={exam.id} course={exam.course} exam={exam} />
      ))}
    </>
  );
}

function Row({ exam, course }) {
  function CellLink({ content }) {
    return (
      <a target="_blank" rel="noreferrer" href={`${exam.fileLink}`}>
        {content}
      </a>
    );
  }
  return (
    <tr>
      <td>{<CellLink content={exam.name} />}</td>
      <td>{<CellLink content={course.name} />}</td>
    </tr>
  );
}
