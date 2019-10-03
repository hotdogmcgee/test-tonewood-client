import React from "react";

export default function ValidationError(props) {
  if (props.hasError) {
    return (
      <div className="validation-error error">
        <p>{props.message}</p>
      </div>
    );
  }

  return <></>;
}
