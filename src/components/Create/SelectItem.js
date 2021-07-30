import { CgAddR } from "react-icons/cg";
import styled from "styled-components";

export default function SelectItem({
  htmlLabel,
  optionsArr,
  onChange,
  value,
  htmlId,
  fnAdd,
}) {
  return (
    <RowWrapper>
      <label htmlFor={htmlId}>{htmlLabel}</label>
      <select onChange={onChange} value={value} id={htmlId} name={htmlId}>
        <Options arr={optionsArr} />
      </select>
      {fnAdd ? <CgAddR style={{ cursor: "pointer" }} onClick={fnAdd} /> : null}
    </RowWrapper>
  );
}

function Options({ arr }) {
  return (
    <>
      {arr.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </>
  );
}

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  gap: 5px;

  select {
    font-size: 18px;
    width: 300px;
  }
`;
