const SubmissionValidation = {
  validateSelectWood(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    if (fieldValue == "none") {
      fieldErrors.selectWood = "Please select a wood";
      hasError = true;
      document.getElementById("tonewood-select").focus();
    } else {
      fieldErrors.selectWood = "";
      hasError = false;
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        selectWoodValid: !hasError
      },
      this.formValid
    );
  }
};

export default SubmissionValidation;
