import React, { Component } from "react";
import ResearchItem from "./ResearchItem.component";
import Axios from "axios";
import Button from "@material-ui/core/Button";

export default class ResearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  // get more 10 items and append it to the current items
  fetchData = () => {
    Axios.get("/api/library/researches/" + this.state.items.length).then(
      res => {
        this.setState({
          items: [...this.state.items, ...res.data]
        });
      }
    );
  };

  render() {
    const items = this.state.items.map((item, id) => {
      return (
        <li>
          <ResearchItem info={item} key={id} />
        </li>
      );
    });
    return (
      <div className="cards-container">
        <ul className="cards">{items}</ul>
        <Button className="show-more-btn" onClick={this.fetchData}>
          show more ...
        </Button>
      </div>
    );
  }
}
