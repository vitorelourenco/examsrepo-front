import { FaChalkboardTeacher } from "react-icons/fa";
import SelectItem from "./SelectItem";

export default function Instructor({
  examOptions,
  setExamOptions,
  instructors,
}) {
  
  const onInstructorChange = (e) => {
    const newExamOptions = { ...examOptions };
    newExamOptions.instructorId = e.target.value;
    setExamOptions(newExamOptions);
  };

  return (
    <SelectItem
      optionsArr={instructors}
      onChange={onInstructorChange}
      value={examOptions.instructorId}
      htmlId="instructors"
      htmlLabel={<FaChalkboardTeacher />}
    />
  );
}
