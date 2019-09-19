const SubmissionValidation = {
    validateSelectWood(fieldValue) {
        console.log('validate', fieldValue);
        const fieldErrors = { ...this.state.validationMessages };
        let hasError = false;
    
        if (fieldValue == "none") {
          console.log('yep');
          fieldErrors.selectWood = "Please select a wood";
          hasError = true;
          document.getElementById('tonewood-select').focus()
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
}

export default SubmissionValidation