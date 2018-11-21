import React, { Component } from "react";
import axios from "axios";
import "./UpdateArticle.css";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import { MenuList } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const lenses = [
  "Refugee-Owned",
  "Refugee-Led",
  "Refugee-Supporting",
  "Refugee-Supporting-Host-Weighted",
  "Lending-Facilities",
  "Refugee-Funds"
];

const SDGs = [
  "Climate-Action",
  "Decent-Work-and-Economic-Growth",
  "Gender-Equality",
  "Good-Health-and-Well-Being",
  "Industry-Innovation-and-Infrastructure",
  "Life-on-Land",
  "No-Poverty",
  "Partnerships-for-the-Goals",
  "Peace-Justice-and-Strong-Institutions",
  "Quality-Education",
  "Reduced-Inqualities",
  "Sustainable-Cities-and-Communities",
  "Zero-Hunger"
];

export default class UpdateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      Article: {},
      title: "",
      pre_description: "",
      lens: "",
      text: "",
      imgs: [],
      SDGs: [],
      loading: false
    };
  }

  componentWillMount() {
    this.getArticle(this.state.id);
  }

  componentDidMount() {
    document.body.style.overflowY = "auto";
  }

  enableAddButton = () => {
    this.setState({
      formValid: true
    });
  };

  disableAddButton = () => {
    this.setState({
      formValid: false
    });
  };

  checkButtonAvailability = () => {
    const state = this.state;
    // check if the user added all required input
    const isValid =
      state.title &&
      state.pre_description &&
      state.lens &&
      state.text &&
      state.imgs;

    if (isValid) {
      this.enableAddButton();
    } else {
      this.disableAddButton();
    }
  };

  getArticle = id => {
    axios.get(`/api/stories/${id}`).then(res => {
      this.setState(
        {
          Article: res.data[0]
        },
        () => {
          this.setState({
            title: res.data[0]["title"],
            pre_description: res.data[0]["pre_description"],
            lens: res.data[0]["lens"],
            text: res.data[0]["text"],
            imgs: res.data[0]["imgs"],
            SDGs: res.data[0]["SDGs"]
          });
        }
      );
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.checkButtonAvailability();
    });
  };

  onChangeSDG = e => {
    const index = e.target.value;
    const sdgVal = SDGs[index];
    const checked = this.state.SDGs.includes(sdgVal);
    let selectedSDGs;

    if (!checked) {
      selectedSDGs = [...this.state.SDGs, SDGs[index]];
    } else {
      selectedSDGs = this.state.SDGs.filter(sdg => {
        return sdg !== sdgVal;
      });
    }

    this.setState(
      {
        SDGs: selectedSDGs
      },
      () => {
        this.checkButtonAvailability();
      }
    );
  };

  onChangeImg = e => {
    this.setState({
      loading: true
    });

    e.preventDefault();
    const formData = new FormData();
    formData.append("img", e.target.files[0]);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios.post("/api/upload", formData, config).then(res => {
      const imageURL = res.data.location;
      this.setState(
        {
          imgs: [imageURL],
          loading: false
        },
        () => {
          this.checkButtonAvailability();
        }
      );
    });
  };

  onChangeText = e => {
    let txtArr = [...this.state.text];
    txtArr[0] = e.target.value;
    this.setState({ text: txtArr }, () => {
      this.checkButtonAvailability();
    });
  };

  updateArticle = e => {
    e.preventDefault();

    let ArticleData = {
      title: this.state.title,
      pre_description: this.state.pre_description,
      lens: this.state.lens,
      text: this.state.text,
      imgs: this.state.imgs,
      SDGs: this.state.SDGs
    };

    axios
      .put(`/api/stories/${this.state.id}`, ArticleData)
      .then(function(response) {
        document.querySelector(".done-img").style.display = "flex";
        setTimeout(() => {
          document.querySelector(".done-img").style.display = "none";
        }, 3000);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    let lensesUI = lenses.map((lens, i) => {
      if (lens === this.state.lens) {
        return (
          <option value={lens} key={i} selected>
            {lens}
          </option>
        );
      } else {
        return (
          <option value={lens} key={i}>
            {lens}
          </option>
        );
      }
    });

    let SDGsUI = SDGs.map((sdg, id) => {
      return (
        <MenuItem>
          <Checkbox
            checked={this.state.SDGs.includes(sdg) ? true : false}
            style={{ color: "var(--color-2)" }}
            onChange={this.onChangeSDG}
            value={id}
          />
          {sdg}
        </MenuItem>
      );
    });

    return (
      <Paper className="admin-form">
        <form method="POST" onSubmit={this.updateArticle}>
          <label htmlFor="Article-title">Article title</label>
          <input
            type="text"
            name="title"
            id="Article-title"
            value={this.state.title}
            onChange={this.onChange}
          />
          <label htmlFor="Article-pre_description">
            Article pre-description
          </label>{" "}
          <input
            type="text"
            name="pre_description"
            id="Article-pre_description"
            value={this.state.pre_description}
            onChange={this.onChange}
          />
          <label htmlFor="Article-text">Article text</label>
          <textarea
            rows="4"
            cols="50"
            type="text"
            name="text"
            id="Article-text"
            value={this.state.text[0]}
            onChange={this.onChangeText}
          />
          <select name="lens" id="lens" onChange={this.onChange}>
            <option>Select Lens</option>
            {lensesUI}
          </select>
          <br />
          <ExpansionPanel id="checkboxes">
            <ExpansionPanelSummary>
              <p>Select SDGs</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <MenuList className="menu-full-width">{SDGsUI}</MenuList>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <br />
          <label htmlFor="image">Article image</label>
          <img
            className="admin-img-update"
            src={this.state.imgs[0]}
            alt="uploaded"
          />
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={this.onChangeImg}
          />
          <img
            src="/imgs/loading.gif"
            alt=""
            className="loading"
            style={{ display: this.state.loading ? "block" : "none" }}
          />
          <button
            type="submit"
            className="btn"
            disabled={!this.state.formValid}
          >
            <i className="fas fa-edit" /> Update Article
          </button>
          <div className="done-img">
            <img src="/imgs/done.gif" alt="" />
          </div>
        </form>
      </Paper>
    );
  }
}
