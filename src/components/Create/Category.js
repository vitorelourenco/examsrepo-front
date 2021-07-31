import { AiOutlineNumber } from "react-icons/ai";
import SelectItem from "../Selection/SelectItem";

export default function Category({
  examOptions,
  setExamOptions,
  categories,
}) {
  
  const onCategoryChange = (e) => {
    const newExamOptions = { ...examOptions };
    newExamOptions.categoryId = e.target.value;
    setExamOptions(newExamOptions);
  };

  return (
    <SelectItem
      optionsArr={categories}
      onChange={onCategoryChange}
      value={examOptions.categoryId}
      htmlId="categories"
      htmlLabel={<AiOutlineNumber />}
    />
  );
}
