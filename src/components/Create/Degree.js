import axios from "axios";
import { GiDiploma } from "react-icons/gi";
import SelectItem from "./SelectItem";

export default function Degree({
  examOptions,
  setExamOptions,
  degrees,
  setDegrees,
  degreesURL,
}) {
  const onDegreeChange = (e) => {
    const newExamOptions = { ...examOptions };
    newExamOptions.degreeId = e.target.value;
    setExamOptions(newExamOptions);
  };

  const addDegree = () => {
    const name = prompt("Type the name of the Degree");
    if (name) {
      axios
        .post(degreesURL, { name })
        .then(({ data }) => {
          const newDegrees = [data, ...degrees];
          newDegrees.sort();
          setDegrees(newDegrees);

          const newExamOptions = { ...examOptions };
          newExamOptions.degreeId = data.id;
          setExamOptions(newExamOptions);
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <SelectItem
      optionsArr={degrees}
      onChange={onDegreeChange}
      value={examOptions.degreeId}
      htmlId="degrees"
      htmlLabel={<GiDiploma />}
      fnAdd={addDegree}
    />
  );
}
