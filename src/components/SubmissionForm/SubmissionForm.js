import React from "react";
import WoodApiService from "../../services/wood-api-service";
// import SubmissionValidation from '../../Validation/SubmissionValidation'
import { Button, Textarea, NumericFormFields, Switch, Section } from "../Utils/Utils";
import WoodListContext from "../../contexts/WoodListContext";
import ValidationError from "../../Validation/ValidationError";
import Formulas from './SubmissionFormHelpers'
import "./SubmissionForm.css";

export default class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitReady: false,
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
      const calcDensity = Formulas.getDensity(sample_length.value, sample_width.value, sample_thickness.value,  sample_weight.value)
      const calcELong = Formulas.getELong(sample_length.value,  sample_width.value, sample_thickness.value, sample_weight.value, peak_hz_long_grain.value)
      const calcECross = Formulas.getECross(sample_length.value, sample_width.value, sample_thickness.value,  sample_weight.value, peak_hz_cross_grain.value)
      const calcVelSoundLong = Formulas.getVelocitySoundLong(sample_length.value, sample_width.value, sample_thickness.value,  sample_weight.value, calcELong)
      const calcRadiationRatio = Formulas.getRadiationRatio(sample_length.value, sample_width.value, sample_thickness.value,  sample_weight.value, calcVelSoundLong)
      WoodApiService.postSubmission({
        tw_id: tw_id.value,
        new_tw_name: new_tw_name.value || null,
        density: calcDensity,
        e_long: calcELong,
        e_cross: calcECross,
        velocity_sound_long: calcVelSoundLong,
        radiation_ratio: calcRadiationRatio,
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

  handleSubmitReady() {
    const {submitReady} = this.state
    this.setState({
      submitReady: !submitReady
    })

  }

  compare(a, b) {
    const genreA = a.common_name.toLowerCase();
    const genreB = b.common_name.toLowerCase();
    
    let comparison = 0;
    if (genreA > genreB) {
      comparison = 1;
    } else if (genreA < genreB) {
      comparison = -1;
    }
    return comparison;
  }

  renderTwOptions() {
    const { woodsList = [] } = this.context;
    const sortList = woodsList.sort(this.compare)
    const listWithoutOther = sortList.filter(wood => wood.id !== 1)
    return listWithoutOther.map(wood => {
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
            <option value='1' key='1'>
              Other
            </option>
            {/* <option value="" */}
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

        <Button type="submit" disabled={!this.state.submitReady}>Add submission</Button>
        <Section id="SubmitReady__Section">
          <h2>I have double checked my data!</h2>
        <Switch isOn={this.state.submitReady} switchId={'submit-ready-switch'}
        handleChange={() => this.handleSubmitReady()}/>

        </Section>

      </form>
    );
  }

  render() {
    return this.renderSubmissionForm();
  }
}
