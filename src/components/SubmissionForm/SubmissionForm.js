import React from "react";
import WoodApiService from "../../services/wood-api-service";
// import SubmissionValidation from '../../Validation/SubmissionValidation'
import { Button, Textarea, NumericFormFields } from "../Utils/Utils";
import WoodListContext from "../../contexts/WoodListContext";
import ValidationError from "../../Validation/ValidationError";
import "./SubmissionForm.css";

export default class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionValue: "none",
      error: null,
      selectWood: "",
      selectWoodValid: false,
      new_tw_name: "",
      new_tw_nameValid: true,
      validationMessages: {
        selectWood: "",
        new_tw_name: ""
      }
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  static defaultProps = {
    onSubmissionSuccess: () => {}
  };

  static contextType = WoodListContext;

  componentDidMount() {
    this.context.clearError();
    WoodApiService.getWoods()
      .then(this.context.setWoodsList)
      .catch(this.context.setError);
  }

  formValid() {
    const { selectWoodValid, new_tw_nameValid } = this.state;
    this.setState({
      formValid: selectWoodValid && new_tw_nameValid
    });
  }

  updateSelectWood(selectWood) {
    this.setState({ selectWood }, () => {
      this.validateSelectWood(selectWood);
    });
  }

  updateNewTonewood(new_tw_name) {
    this.setState({ new_tw_name }, () => {
      this.validateNewTonewood(new_tw_name);
    });
  }

  validateSelectWood(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    if (fieldValue === "none") {
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

  validateNewTonewood(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    if (fieldValue.length === 0) {
      fieldErrors.new_tw_name = "Please enter a name";
      hasError = true;
      document.getElementById("Input_new_tw_name").focus();
    } else {
      if (
        fieldValue.length < 3 || fieldValue.length > 72 ||
        !fieldValue.match(new RegExp(/^\b(?!.*?\s{2})[A-Za-z ]{1,50}\b$/))
      ) {
        fieldErrors.new_tw_name =
          "Name must be between 3 and 72 characters, using letters A-Z";
        hasError = true;
      } else {
        fieldErrors.new_tw_name = "";
        hasError = false;
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        new_tw_nameValid: !hasError
      },
      this.formValid
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      tw_id,
      new_tw_name,
      density,
      e_long,
      e_cross,
      velocity_sound_long,
      radiation_ratio,
      sample_length,
      sample_width,
      sample_thickness,
      sample_weight,
      peak_hz_long_grain,
      peak_hz_cross_grain,
      comments
    } = e.target;
    const items = [
      tw_id,
      new_tw_name,
      density,
      e_long,
      e_cross,
      velocity_sound_long,
      radiation_ratio,
      sample_length,
      sample_width,
      sample_thickness,
      sample_weight,
      peak_hz_long_grain,
      peak_hz_cross_grain,
      comments
    ];
    if (tw_id.value === "none") {
      this.validateSelectWood(tw_id.value);
    }
    if (this.handleSubmitValid() === false) {
      console.log("oops");
    } else {
      WoodApiService.postSubmission({
        tw_id: tw_id.value,
        new_tw_name: new_tw_name.value || null,
        density: density.value,
        e_long: e_long.value,
        e_cross: e_cross.value,
        velocity_sound_long: velocity_sound_long.value,
        radiation_ratio: radiation_ratio.value,
        sample_length: sample_length.value,
        sample_width: sample_width.value,
        sample_thickness: sample_thickness.value,
        sample_weight: sample_weight.value,
        peak_hz_long_grain: peak_hz_long_grain.value,
        peak_hz_cross_grain: peak_hz_cross_grain.value,
        comments: comments.value
      })
        .then(() => {
          for (let i = 0; i < items.length; i++) {
            items[i].value = "";
          }
          this.props.onSubmissionSuccess();
        })
        .catch(res => {
          this.context.setError();
        });
    }
  };

  handleSelectChange(event) {
    this.setState({ optionValue: event.target.value });
    this.updateSelectWood(event.target.value);
  }

  handleSubmitValid() {
    if (!this.state.formValid) {
      return false;
    } 
    this.setState({
      new_tw_nameValid: true
    })
  }

  renderTwOptions() {
    const { woodsList = [] } = this.context;
    return woodsList.map(wood => {
      return (
        <option value={wood.id} key={wood.id}>
          {wood.common_name} ({wood.genus} {wood.species})
        </option>
      );
    });
  }

  renderNewTonewood() {
    if (this.state.optionValue !== "1") {
      return { display: "none" };
    }
  }

  renderSubmissionForm() {
    return (
      <form className="SubmissionForm" onSubmit={this.handleSubmit}>
        <div className="tw_id">
          <label htmlFor="tw_id">Select your tonewood</label>
          <select
            required
            aria-label="Select your tonewood!"
            name="tw_id"
            id="tonewood-select"
            className="tw_select"
            value={this.state.optionValue}
            onChange={this.handleSelectChange}
          >
            <option value="none" disabled hidden>
              Select a Wood
            </option>
            {this.renderTwOptions()}
          </select>
          <ValidationError
            hasError={!this.state.selectWoodValid}
            message={this.state.validationMessages.selectWood}
            className={"tw_id_error"}
          />
        </div>

        <div style={this.renderNewTonewood()} id="new_tw_name">
          <label htmlFor="SubmissionForm__new_tw_name" value="new_tw_name">
            New tonewood
          </label>
          <Textarea
            name="new_tw_name"
            id="Input_new_tw_name"
            placeholder="Specify scientific name if possible"
            onChange={e => this.updateNewTonewood(e.target.value)}
          ></Textarea>
          <ValidationError
            hasError={!this.state.new_tw_nameValid}
            message={this.state.validationMessages.new_tw_name}
          />
        </div>

        <NumericFormFields />
        <div className="comments">
          <label htmlFor="SubmissionForm__comments">Comments</label>
          <Textarea
            name="comments"
            className="Input_comments"
            placeholder="Write something"
          ></Textarea>
        </div>

        <Button type="submit">Add submission</Button>
      </form>
    );
  }

  render() {
    return this.renderSubmissionForm();
  }
}
