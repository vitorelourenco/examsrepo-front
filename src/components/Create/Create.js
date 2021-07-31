import styled from "styled-components";
import { getAWSSignature, uploadWithSignature } from "../../utils/aws";
import { useEffect, useState } from "react";
import axios from "axios";
import Configuration from "./Configuration";
import ExamBox from "../ExamBox/ExamBox";
import useInitialDegreeAndCategoriesOptions from "../../hooks/useInitialDegreeAndCategoriesOptions";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const degreesURL = new URL("degrees", BASE_URL);
const examsURL = new URL("exams", BASE_URL);

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

  useInitialDegreeAndCategoriesOptions(
    examOptions,
    setDegrees,
    setCategories,
    setExamOptions
  );

  useOptionsForDegree({
    examOptions,
    setDrive,
    setCourses,
    setInstructors,
    setExamOptions,
  });

  useOptionsForCourse({ examOptions, drive, setInstructors, setExamOptions });

  useSubmitEnabler({
    file,
    link,
    submitType,
    examOptions,
    isSubmitDisabled,
    setIsSubmitDisabled,
  });

  const handleSubmit = (e) => onFormSubmit(e,examOptions,file,link,submitType)

  return (
    <Form onSubmit={handleSubmit}>
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
      <ExamBox
        {...{
          file,
          setFile,
          submitType,
          setSubmitType,
          isSubmitDisabled,
          setLink,
          link,
        }}
      />
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

function onFormSubmit (e,examOptions,file,link,submitType) {
  e.preventDefault();

  const courseId = parseInt(examOptions.courseId);
  const instructorId = parseInt(examOptions.instructorId);
  const degreeId = parseInt(examOptions.degreeId);
  const categoryId = parseInt(examOptions.categoryId);
  const name = examOptions.name;

  const body = {
    courseId,
    instructorId,
    degreeId,
    categoryId,
    name,
    fileLink: link,
  };

  if (submitType === "upload") {
    getAWSSignature(file)
      .then(({ data }) => {
        const blob = file.slice(0, file.size, file.type);
        const newFile = new File([blob], data.newFileName, {
          type: file.type,
        });
        return uploadWithSignature(
          newFile,
          data.awsData.signedRequest,
          data.awsData.url
        );
      })
      .then(({ data }) => {
        body.fileLink = data.url;
        return axios.post(examsURL, body);
      })
      .then(() => alert("success"))
      .catch((err) => alert(err));
  } else {
    axios
      .post(examsURL, body)
      .then(() => alert("sucesso"))
      .catch((err) => alert(err));
  }
};


function useSubmitEnabler({
  file,
  link,
  submitType,
  examOptions,
  isSubmitDisabled,
  setIsSubmitDisabled,
}) {
  //check if the form is ready to submit
  useEffect(() => {
    const shouldStayDisabled = (() => {
      if (!file && submitType === "upload") return true;
      if (!link && submitType === "link") return true;
      if (!examOptions.courseId) return true;
      if (!examOptions.name) return true;
      if (!examOptions.instructorId) return true;
      if (!examOptions.degreeId) return true;
      if (!examOptions.categoryId) return true;
      return false;
    })();
    if (shouldStayDisabled !== isSubmitDisabled) {
      setIsSubmitDisabled(!isSubmitDisabled);
    }
  }, [// eslint-disable-line react-hooks/exhaustive-deps
    submitType,
    file,
    link,
    examOptions.courseId,
    examOptions.name,
    examOptions.instructorId,
    examOptions.degreeId,
    examOptions.categoryId,
  ]);
}

function useOptionsForDegree({
  examOptions,
  setDrive,
  setCourses,
  setInstructors,
  setExamOptions,
}) {
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
}

function useOptionsForCourse({
  examOptions,
  drive,
  setInstructors,
  setExamOptions,
}) {
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
}
