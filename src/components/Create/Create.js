import styled from "styled-components";
import { uploadToAWS } from "../../utils/aws";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Configuration from "./Configuration";
import ExamBox from "./ExamBox";

class ExamOptions {
  constructor(params) {
    const { degreeId } = params;
    this.degreeId = degreeId;
  }
}

export default function Create() {
  const [file, setFile] = useState(null);
  const [degrees, setDegrees] = useState([]);

  const [examOptions, setExamOptions] = useState(
    new ExamOptions({ degreeId: "" })
  );

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const degreesURL = useMemo(() => new URL("degrees", BASE_URL), [BASE_URL]);

  useEffect(() => {
    axios
      .get(degreesURL)
      .then(({ data }) => setDegrees(data))
      .catch((err) => alert(err));
  }, [BASE_URL, degreesURL]);

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
      <Configuration {...{examOptions, setExamOptions, degrees, setDegrees, degreesURL}}/>
      <ExamBox {...{ file, setFile }}/>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;


`;
