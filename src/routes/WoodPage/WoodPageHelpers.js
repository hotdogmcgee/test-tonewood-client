import React from "react";
import { NiceDate } from "../../components/Utils/Utils";
import EllipsisWithTooltip from "react-ellipsis-with-tooltip";

export function WoodDescription({ wood }) {
  return (
    <>
      <p className="scientific-name">
        {wood.genus} {wood.species}
      </p>
    </>
  );
}

export function MakeSubmissionsTable({ submissions = [] }) {
  if (submissions.length) {
    return <div className="table-container">{makeTable(submissions)}</div>;
  } else {
    return (
      <div>
        <h2>No submissions yet!</h2>
      </div>
    );
  }
}

function niceSubKeys(text) {
  const niceText = text.replace(/_/g, " ");
  return niceText;
}
function makeTable(submissions = []) {
  const tableData = renderTableData(submissions);
  if (submissions.length) {
    let subObj = Object.keys(submissions[0]);
    const filteredArray = subObj.filter(
      obj => obj !== "user" && obj !== "tw_id"
    );
    let header = filteredArray;

    const headerNames = header.map((key, index) => {
      const niceKey = niceSubKeys(key);
      return (
        <th title={niceKey} key={index}>
          {niceKey.toUpperCase()}
        </th>
      );
    });
    return (
      <table id="Woodpage__submissions-table" cellPadding="3" cellSpacing="1">
        <tbody>
          <tr>{headerNames}</tr>
          {tableData}
        </tbody>
      </table>
    );
  }
}

function RenderRows({ rows }) {
  delete rows.user;
  delete rows.tw_id;
  const tdArrData = Object.values(rows);
  const tdKeys = Object.keys(rows);
  return (
    <tr>
      {tdArrData.map((value, index) => {
        return <RenderTd listType={tdKeys[index]} value={value} key={index} />;
      })}
    </tr>
  );
}

function RenderTd({ value, listType }) {
  //switch statement possibly
  if (listType === "date_created") {
    return (
      <td>
        <NiceDate date={value} />
      </td>
    );
  }
  if (listType === "comments") {
    return (
      <td>
        {/* <TextOverflowTooltip 
   maxWidth="100px" maxHeight='100px'>{value}</TextOverflowTooltip> */}
        <EllipsisWithTooltip placement="bottom">{value}</EllipsisWithTooltip>
      </td>
    );
  } else {
    return <td>{value}</td>;
  }
}

function renderTableData(submissions) {
  return submissions.map((sub, index) => {
    return <RenderRows key={index} rows={sub} />;
  });
}
