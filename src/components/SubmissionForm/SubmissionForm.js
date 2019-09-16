import React from "react";
import WoodApiService from "../../services/wood-api-service";
import { Button, Textarea, NumericFormFields } from "../Utils/Utils";
import WoodListContext from "../../contexts/WoodListContext";
import "./SubmissionForm.css";

export default class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionValue: "none",
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
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
      sample_weight_grams,
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
      sample_weight_grams,
      peak_hz_long_grain,
      peak_hz_cross_grain,
      comments
    ];
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
      sample_weight_grams: sample_weight_grams.value,
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
  };

  handleChange(event) {
    this.setState({ optionValue: event.target.value });
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

  setStyle() {
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
            onChange={this.handleChange}
          >
            <option value="none" disabled hidden>
              Select a Wood
            </option>
            {this.renderTwOptions()}
          </select>
        </div>

        <div style={this.setStyle()} className="new_tw_name">
          <label htmlFor="SubmissionForm__new_tw_name" value="new_tw_name">
            New tonewood
          </label>
          <Textarea
            name="new_tw_name"
            className="Input_new_tw_name"
            placeholder="Specify scientific name if possible"
          ></Textarea>
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
