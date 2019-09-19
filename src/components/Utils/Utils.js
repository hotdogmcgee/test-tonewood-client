import React from "react";
import { format as formatDate, parseISO } from "date-fns";
import ValidationError from '../../Validation/ValidationError'
import "./Utils.css";

export const displayFields = [
`Density (kg/m^3)`,
  "E Long (GPa)",
  "E Cross (GPa)",
  "Velocity Sound Long (km/s)",
  "Radiation Ratio",
  "Length (mm)",
  "Width (mm)",
  "Thickness (mm)",
  "Weight (grams)",
  "Peak Frequency Long (Hz)",
  "Peak Frequency Cross (Hz)"
]
export function Section({ className, list, ...props }) {
  const classes = ["Section", list && "Section--list", className]
    .filter(Boolean)
    .join(" ");
  return <section className={classes} {...props} />;
}

export function Required({ className, ...props }) {
  return (
    <span className={["Required", className].join(" ")} {...props}>
      &#42;
    </span>
  );
}

export function NiceDate({ date, format = "d MMM yyyy" }) {
  const isoString = parseISO(date);
  return formatDate(isoString, format);
}

export function Button({ className, ...props }) {
  return <button className={["Button", className].join(" ")} {...props} />;
}

export function Input({ className, ...props }) {
  return <input className={["Input", className].join(" ")} {...props} />;
}

export function Textarea({ className, ...props }) {
  return <textarea className={["Textarea", className].join(" ")} {...props} />;
}

export function NumericFormFields({ className, ...props }) {
  const inputFields = [
    "density",
    "e_long",
    "e_cross",
    "velocity_sound_long",
    "radiation_ratio",
    "sample_length",
    "sample_width",
    "sample_thickness",
    "sample_weight",
    "peak_hz_long_grain",
    "peak_hz_cross_grain"
  ];

  const displayFields = [
    `Density (kg/m^3)`,
    "E Long (GPa)",
    "E Cross (GPa)",
    "Velocity Sound Long (km/s)",
    "Radiation Ratio",
    "Length (mm)",
    "Width (mm)",
    "Thickness (mm)",
    "Weight (grams)",
    "Peak Frequency Long (Hz)",
    "Peak Frequency Cross (Hz)"
  ];

  return inputFields.map((field, key) => {
    return (
      <div className={field} key={key}>
        <label htmlFor={["SubmissionForm__", field].join("")} value={field}>
          {displayFields[key]} <Required />
        </label>
        <Input name={field} className={field, 'numeric_field'} {...props} type="number" autoComplete='off' max='9999' min='0' step='any'></Input>
        {/* <ValidationError
            hasError={!this.state.numberValid}
            message={'number validation error'}
          /> */}
      </div>
    );
  });
}

