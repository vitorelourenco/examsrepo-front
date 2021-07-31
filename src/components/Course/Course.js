import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import TableStyle from "../Utils/TableStyle";
import { FaChalkboardTeacher } from "react-icons/fa";
import styled from "styled-components";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Instructor() {
  const [categories, setCategories] = useState([]);

  const { courseId } = useParams();
  const examURL = useMemo(
    () => new URL(`exams/course/${courseId}/byCategory`, BASE_URL),
    [courseId]
  );

  useEffect(() => {
    axios
      .get(examURL)
      .then(({ data }) => setCategories(data))
      .catch((err) => {
        alert(err);
        setCategories([]);
      });
  }, [courseId, examURL]);

  if (!courseId) return null;

  return (
    <> 
      <Info>
        <h3>Degree: {categories[0]?.exams[0]?.course?.degree?.name}</h3>
        <h1>Course: {categories[0]?.exams[0]?.course?.name}</h1>
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
              <FaChalkboardTeacher />
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
        <Row key={exam.id} instructor={exam.instructor} exam={exam} />
      ))}
    </>
  );
}

function Row({ exam, instructor }) {
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
      <td>{<CellLink content={instructor.name} />}</td>
    </tr>
  );
}
