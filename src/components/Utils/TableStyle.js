import styled from "styled-components";

const TableStyle = styled.table`
  margin: 10px auto;
  border: 1px solid #333;
  font-size: 20px;
  border: 1px solid white;

  td,th{
    text-align: center;
  }

  a{
    padding: 10px;
    display: block;
  }

  th{
    background-color: #848484;
    padding: 10px;
  }

  tbody{
    tr:nth-child(odd){
      background-color: #eee;
      color: #333;
    }
    tr:nth-child(even){
      background-color: #333;
      color: #eee;
    }

  }
`;

export default TableStyle;