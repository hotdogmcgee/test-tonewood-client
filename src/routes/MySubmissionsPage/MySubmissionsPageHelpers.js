import React from "react";
import { NiceDate } from "../../components/Utils/Utils";
import EllipsisWithTooltip from "react-ellipsis-with-tooltip";

export function MakeMySubmissionsTable({ submissions = [] }) {
  if (submissions.length) {
    return (
      <div className="table-container">
        {makeMySubmissionsTable(submissions)}
      </div>
    );
  } else {
    return (
      <div className="no-submissions-header">
        <h2>No submissions yet!</h2>
      </div>
    );
  }
}

function renderMySubTableData(submissions) {
  return submissions.map((sub, index) => {
    return <RenderMySubRows key={index} rows={sub} />;
  });
}

function makeMySubmissionsTable(submissions = []) {
  const tableData = renderMySubTableData(submissions);
  if (submissions.length) {
    let subObj = Object.keys(submissions[0]);
    const filteredHeaderNames = subObj.filter(
      obj => obj !== "user" && obj !== "user_id" && obj !== "tw_id"
    );
    return (
      <table id="Woodpage__submissions-table" cellPadding="3" cellSpacing="1">
        <tbody>
          <tr>{makeHeaderNames(filteredHeaderNames)}</tr>
          {tableData}
        </tbody>
      </table>
    );
  }
}

function RenderMySubRows({ rows }) {
  delete rows.user;
  delete rows.user_id;
  delete rows.tw_id;
  const tdArrData = Object.values(rows);
  const tdKeys = Object.keys(rows);
  return (
    <tr>
      {tdArrData.map((value, index) => {
        return (
          <RenderTdValue listType={tdKeys[index]} value={value} key={index} />
        );
      })}
    </tr>
  );
}

function makeHeaderNames(filteredHeaderNames) {
  const headerNames = filteredHeaderNames.map((key, index) => {
    const niceKey = niceSubKeys(key);
    return (
      <th
        onClick={() => sortTable(index)}
        title={niceKey}
        key={index}
        className={`th__${key}`}
      >
        {niceKey.toUpperCase()}
      </th>
    );
  });
  return headerNames;
}

function niceSubKeys(text) {
  const niceText = text.replace(/_/g, " ");
  return niceText;
}

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("Woodpage__submissions-table");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (n !== 1) {
        var xContent = isNaN(x.innerHTML)
          ? x.innerHTML.toLowerCase() === "-"
            ? 0
            : x.innerHTML.toLowerCase()
          : parseFloat(x.innerHTML);

        var yContent = isNaN(y.innerHTML)
          ? y.innerHTML.toLowerCase() === "-"
            ? 0
            : y.innerHTML.toLowerCase()
          : parseFloat(y.innerHTML);
      }
      //to compare dates
      else {
        xContent = new Date(x.innerHTML);
        yContent = new Date(y.innerHTML);
      }

      if (dir === "asc") {
        if (xContent > yContent) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === "desc") {
        if (xContent < yContent) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount === 0 && dir === "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function RenderTdValue({ value, listType }) {
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
        <EllipsisWithTooltip placement="bottom">{value}</EllipsisWithTooltip>
      </td>
    );
  } else {
    return <td>{value}</td>;
  }
}
