import styled from "styled-components";
import { uploadToAWS } from "../../utils/aws";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Configuration from "./Configuration";
import ExamBox from "../ExamBox/ExamBox";

export default function Create() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState(null);
  const [submitType, setSubmitType] = useState("upload");

  const [drive, setDrive] = useState({});

  const [degrees, setDegrees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [examOptions, setExamOptions] = useState({
    degreeId: "",
    categoryId: "",
    instructorId: "",
    courseId: "",
    name: "",
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const degreesURL = useMemo(() => new URL("degrees", BASE_URL), [BASE_URL]);
  const categoriesURL = useMemo(
    () => new URL("categories", BASE_URL),
    [BASE_URL]
  );

  //Get and set the list of degrees and exam categories
  useEffect(() => {
    const p1 = axios.get(degreesURL);

    const p2 = axios.get(categoriesURL);

    Promise.all([p1, p2])
      .then(([degreeResponse, categoryResponse]) => {
        const newExamOptions = { ...examOptions };
        newExamOptions.degreeId = `${degreeResponse.data[0].id}`;
        newExamOptions.categoryId = `${categoryResponse.data[0].id}`;
        setDegrees(degreeResponse.data);
        setCategories(categoryResponse.data);
        setExamOptions(newExamOptions);
      })
      .catch((err) => alert(err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //recalculate the courses and instructors options when the degree changes
  useEffect(() => {
    if (!examOptions.degreeId) return;
    const driveURL = new URL(`degrees/drive/${examOptions.degreeId}`, BASE_URL);
    axios.get(driveURL).then(({ data }) => {
      setDrive(data);
      const courses = data?.courses || [];
      const prunedCourses =
        courses?.map((course) => ({ id: course.id, name: course.name })) || [];
      setCourses(prunedCourses);

      const instructors = courses[0]?.instructors || [];
      const prunedInstructors =
        instructors?.map((instructors) => ({
          id: instructors.id,
          name: instructors.name,
        })) || [];
      setInstructors(prunedInstructors);

      const newExamOptions = { ...examOptions };
      newExamOptions.courseId = `${courses[0]?.id || ""}`;
      newExamOptions.instructorId = `${instructors[0]?.id || ""}`;
      setExamOptions(newExamOptions);
    });
  }, [examOptions.degreeId, BASE_URL]); // eslint-disable-line react-hooks/exhaustive-deps

  //recalculate the instructor options when course changes 
  useEffect(() => {
    if (!examOptions.courseId) return;
    const course = drive.courses.find(
      (course) => `${course.id}` === examOptions.courseId
    );
    setInstructors(course?.instructors || []);
    const newExamOptions = { ...examOptions };
    newExamOptions.instructorId = `${course?.instructors[0]?.id || ""}`;
    setExamOptions(newExamOptions);
  }, [examOptions.courseId, drive.courses]); // eslint-disable-line react-hooks/exhaustive-deps

  //check if the form is ready to submit
  useEffect(()=>{
    const shouldStayDisabled = (()=>{
      if(!file && submitType === "upload") return true;
      if(!link && submitType === "link") return true;
      if(!examOptions.courseId) return true;
      if(!examOptions.name) return true;
      if(!examOptions.instructorId) return true;
      if(!examOptions.degreeId) return true;
      if(!examOptions.categoryId) return true;
      return false;
    })();
    if (shouldStayDisabled !== isSubmitDisabled){
      setIsSubmitDisabled(!isSubmitDisabled);
    };
  },[file,link,examOptions.courseId,examOptions.name,examOptions.instructorId,examOptions.degreeId,examOptions.categoryId]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFormSubmit = (e) => {
    e.preventDefault();

    uploadToAWS(file)
      .then(({ data }) => {
        alert(data.url);
        setFile(null);
      })
      .catch((err) => alert(err));
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Configuration
        {...{
          examOptions,
          setExamOptions,
          degrees,
          setDegrees,
          degreesURL,
          courses,
          instructors,
          categories,
        }}
      />
      <ExamBox {...{ file, setFile , submitType, setSubmitType, isSubmitDisabled, setLink, link}} />
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;
