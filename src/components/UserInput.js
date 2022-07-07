import React, { Component } from "react";
import suggestdata from "../MockData";

class UserInput extends Component {
  state = {
    tags: [],
    input: "",
    suggestions: [],
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      input: value,
    });
    this.handleSuggestion();
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
    }
    const { tags, input, suggestions } = this.state;
    const text = suggestions.length ? suggestions[0].text : input;
    if ([9, 13].includes(e.keyCode) && text) {
      this.setState({
        tags: [...tags, text],
        input: "",
      });
    }
  };

  handleSuggestion = () => {
    const { input, tags } = this.state;
    const suggestFilterInput = suggestdata.filter((suggest) =>
      suggest.text.toLowerCase().includes(input.toLowerCase())
    );

    const suggestFilterTags = suggestFilterInput.filter(
      (suggest) => !tags.includes(suggest.text)
    );

    this.setState({
      suggestions: suggestFilterTags,
    });
  };

  handleDelete = (i) => {
    const { tags } = this.state;
    const newTags = tags.filter((tag, j) => i !== j);
    this.setState({
      tags: newTags,
    });
  };

  AddTags = (text) => {
    this.setState({
      tags: [...this.state.tags, text],
      input: "",
    });
  };

  render() {
    const { tags, input, suggestions } = this.state;
    return (
      <div className="tags-content">
        {tags.map((tag, i) => (
          <div key={i} className="tag">
            {tag}
            <div className="remove-tag" onClick={() => this.handleDelete(i)}>
              <i class="ri-close-line remove-input"></i>
            </div>
          </div>
        ))}
        <div className="tags-input">
          <input
            className="input-input"
            type="text"
            value={input}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Add name"
          />
          {input && Boolean(suggestions.length) && (
            <div className="tags-suggestions">
              {suggestions.map((suggest) => (
                <div
                  className="suggestion-item"
                  onClick={() => this.AddTags(suggest.text)}
                >
                  <img
                    className="suggest-image"
                    alt="i"
                    src={suggest.image}
                  ></img>{" "}
                  {suggest.text}{" "}
                  <span className="suggest-email">{suggest.email}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserInput;
