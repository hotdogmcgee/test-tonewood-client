import React from "react";
import WoodApiService from "../../services/wood-api-service";
import { Button, Textarea, NumericFormFields } from "../Utils/Utils";
import "./SubmissionForm.css";
import WoodListContext from "../../contexts/WoodListContext";

export default class SubmissionForm extends React.Component {
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

  state = { error: null };
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
      //need to make
      //   .then(this.context.addSubmission)
      .then(() => {
        for (let i = 0; i < items.length; i++) {
          items[i].value = "";
        }
        this.props.onSubmissionSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

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

  render() {
    return (
      <form className="SubmissionForm" onSubmit={this.handleSubmit}>
        <div className="tw_id">
          <label htmlFor="tw_id">Select your tonewood</label>
          <select
            required
            aria-label="Select your tonewood!"
            name="tw_id"
            id="tonewood-select"
          >
            {this.renderTwOptions()}
          </select>
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
}
