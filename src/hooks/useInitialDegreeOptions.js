import { useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const degreesURL = new URL("degrees", BASE_URL);
const categoriesURL = new URL("categories", BASE_URL);

export default function useIntialDegreeOptions(
  examOptions,
  setDegrees,
  setCategories,
  setExamOptions
) {
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
}