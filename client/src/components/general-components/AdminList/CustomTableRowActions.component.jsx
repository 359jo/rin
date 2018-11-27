import React, { Component } from "react";
import TableCell from "@material-ui/core/TableCell";
import Axios from "axios";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

export default class CustomTableRowActions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteItem = id => {
    Axios.delete(`/api/${this.props.pluralName}/${id}`)
      .then(res => {
        console.log("deleted");
      })
      .catch(err => {
        console.log("Error deleting a table row");
      });
  };

  render() {
    const buttonStyle = {
      height: "40px",
      width: "40px"
    };
    let { itemID, itemName, pluralName } = this.props;
    return (
      <TableCell key="buttons">
        <Link to={"/dashboard/" + pluralName + "/list/" + itemID}>
          <IconButton style={buttonStyle}>
            <i className="far fa-eye" style={{ fontSize: "1rem" }} />
          </IconButton>
        </Link>
        <Link to={`/dashboard/${pluralName}/list/update${itemName}/${itemID}`}>
          <IconButton style={buttonStyle}>
            <i
              className="fas fa-edit"
              style={{ color: "royalblue", fontSize: "1rem" }}
            />
          </IconButton>
        </Link>
        <a onClick={() => this.deleteItem(itemID)}>
          <IconButton style={buttonStyle}>
            <i
              className="fas fa-trash-alt"
              style={{ color: "crimson", fontSize: "1rem" }}
            />
          </IconButton>
        </a>
      </TableCell>
    );
  }
}
