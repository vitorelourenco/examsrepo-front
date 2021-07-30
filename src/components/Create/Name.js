import styled from "styled-components";

export default function Name({
  examOptions,
  setExamOptions,
}) {
  
  const onNameChange = (e) => {
    const newExamOptions = { ...examOptions };
    newExamOptions.name = e.target.value;
    setExamOptions(newExamOptions);
  };

  return (
    <RowWrapper>
      <label htmlFor={"examName"}>{"A"}</label>
      <input required type="text" onChange={onNameChange} value={examOptions.name} id={"examName"} name={"examName"} />
    </RowWrapper>
  );
}

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  gap: 5px;

  input {
    font-size: 18px;
    width: 300px;
  }
`;
