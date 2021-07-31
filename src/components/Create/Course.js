import { HiBookOpen } from "react-icons/hi";
import SelectItem from "../Selection/SelectItem";

export default function Course({
  examOptions,
  setExamOptions,
  courses,
  hasAdd,
}) {
  
  const onCourseChange = (e) => {
    const newExamOptions = { ...examOptions };
    newExamOptions.courseId = e.target.value;
    setExamOptions(newExamOptions);
  };

  return (
    <SelectItem
      optionsArr={courses}
      onChange={onCourseChange}
      value={examOptions.courseId}
      htmlId="courses"
      htmlLabel={<HiBookOpen />}
      hasAdd={hasAdd}
    />
  );
}
