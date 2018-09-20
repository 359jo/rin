import React, { Component } from "react";
import "./Landing.css";

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    this.bindEvents();
    this.rotateArrows();
    this.showVideo();
  }

  // bind the events to the local functions.
  bindEvents = () => {
    window.onmousewheel = this.handleWheel;
    window.onkeydown = this.handleArrowsInput;
    window.onmousemove = this.onMouseMove;
  };

  // rotate the arrows for the landing page.
  rotateArrows = () => {
    document.querySelector(".arrows").style.transform = "rotate(0)";
  };

  // mouse move effect on the landing page circle;
  onMouseMove = e => {
    // exit if not on the landing page
    if (!document.querySelector(".effect-circle")) {
      return;
    }

    // get the mouse axis
    if (!document.querySelector(".effect-circle")) {
      return;
    }

    const circleX = e.clientX;
    const circleY = e.clientY;
    document.querySelector(".effect-circle").style.top = circleY - 100 + "px";
    document.querySelector(".effect-circle").style.left = circleX - 100 + "px";
  };

  // mouse wheel handler for the landing page
  handleWheel = e => {
    if (e.deltaY === -100) {
      this.animatePrev();
    } else {
      this.animateNext();
    }
  };

  // key press handler for the landing page
  handleArrowsInput = e => {
    if (e.key === "ArrowRight") {
      this.animateNext();
    } else if (e.key === "ArrowLeft") {
      this.animatePrev();
    }
  };


  // show the video only on stories tab
  showVideo = () => {
    if (this.state.index !== 0) {
      document.querySelector('.circle-video').style.display = 'none';
    }
  }

  // change current context on the landing page;
  animateNext = () => {
    // if (this.state.index < 4) {
    if (this.state.index < 2) {
      this.setState(
        {
          index: this.state.index + 1
        },
        () => {
          const divWidth = document.querySelector(".nav-item").offsetWidth;
          const nav = document.querySelector(".nav");
          nav.style.transform = `translate(${-this.state.index * divWidth}px)`;
          this.toggleClassActive();
          this.changeBackground();
          this.translateShapes();
          this.toggleOverlayColor();
          this.showVideo();
        }
      );
    } else {
      this.setState({
        index: 0
      });
    }
  };

  // change current context on the landing page;
  animatePrev = () => {
    if (this.state.index > 0) {
      this.setState(
        {
          index: this.state.index - 1
        },
        () => {
          const divWidth = document.querySelector(".nav-item").offsetWidth;
          const nav = document.querySelector(".nav");
          nav.style.transform = `translate(${-this.state.index * divWidth}px)`;
          this.toggleClassActive();
          this.changeBackground();
          this.translateShapes();
          this.toggleOverlayColor();
          this.showVideo();
        }
      );
    } else {
      this.setState({
        index: 3
      });
    }
  };

  // toggle the 'active' class on
  toggleClassActive = () => {
    document.querySelectorAll(".active").forEach(e => {
      e.classList.remove("active");
    });
    document
      .querySelector(".nav-group")
      .childNodes[this.state.index].firstChild.classList.add("active");
  };

  changeBackground = () => {
    document.querySelector(".circle").style.background = `url(imgs/backs${this
      .state.index + 1}.jpg)`;
    document.querySelector(".circle").style.backgroundAttachment = "fixed";
    document.querySelector(".up-rec").style.background = `url(imgs/backs${this
      .state.index + 1}.jpg)`;
    document.querySelector(".up-rec").style.backgroundAttachment = "fixed";
    document.querySelector(".down-rec").style.background = `url(imgs/backs${this
      .state.index + 1}.jpg)`;
    document.querySelector(".down-rec").style.backgroundAttachment = "fixed";
  };

  translateShapes = () => {
    let random1 = Math.floor(Math.random() * 50);
    let random2 = Math.floor(Math.random() * 50);
    if (random1 < 15) {
      random1 += 15;
    }

    if (random2 < 15) {
      random2 += 15;
    }

    document.querySelector(".up-rec").style.left = `${random1}%`;
    document.querySelector(".up-rec-overlay").style.left = `${random1}%`;
    document.querySelector(".down-rec").style.right = `${random2}%`;
    document.querySelector(".down-rec-overlay").style.right = `${random2}%`;
  };

  toggleOverlayColor = () => {
    document.querySelector(".up-rec-overlay").style.background =
      document.querySelector(".up-rec-overlay").style.background ===
        "linear-gradient(45deg,var(--color-2), var(--color-2))"
        ? "linear-gradient(45deg, var(--color-4), var(--color-4))"
        : "linear-gradient(45deg,var(--color-2), var(--color-2))";
    document.querySelector(".down-rec-overlay").style.background =
      document.querySelector(".down-rec-overlay").style.background ===
        "linear-gradient(45deg, var(--color-4), var(--color-4))"
        ? "linear-gradient(45deg,var(--color-2), var(--color-2))"
        : "linear-gradient(45deg, var(--color-4), var(--color-4))";
  };

  // navigate to route after 2 seconds
  navigate = () => {
    const routes = ["stories", "map", "data", "library", "about"];
    document.querySelector(".circle").classList.add("grow");
    document.querySelector(".circle-overlay").classList.add("grow");
    setTimeout(() => {
      this.props.history.push(routes[this.state.index]);
    }, 2000);
  };

  render() {
    return (
      <div>
        <div className="landing fadeInFast">
          <div className="partners">
            <img className="i1" src="/imgs/ikea.png" alt="" />
            <img className="i2" src="/imgs/ibm.png" alt="" />
            <img className="i3" src="/imgs/citi.png" alt="" />
            <img className="i4" src="/imgs/google.png" alt="" />
          </div>

          <div className="nav">
            <ul className="nav-group">
              <li className="nav-item">
                <a onClick={this.navigate} className="nav-link active">
                  stories
                </a>
              </li>
              <li className="nav-item">
                <a onClick={this.navigate} className="nav-link">
                  map
                </a>
              </li>
              <li className="nav-item">
                <a onClick={this.navigate} className="nav-link">
                  data
                </a>
              </li>
              {/* <li className="nav-item">
                <a onClick={this.navigate} className="nav-link">
                  library
                </a>
              </li>
              <li className="nav-item">
                <a onClick={this.navigate} className="nav-link">
                  about
                </a>
              </li> */}
            </ul>
          </div>

          <div className="circle-overlay" />
          <div className="circle fadeIn">
            <div className="effect-circle" />
            <video
              src="/videos/stories.mp4"
              autoPlay
              muted
              loop
              height="100"
              className="circle-video"
            />
          </div>

          <div className="shapes">
            <div className="up-rec slideInRight" />
            <div className="up-rec-overlay slideInRight" />
            <div className="down-rec slideInLeft" />
            <div className="down-rec-overlay slideInLeft" />
          </div>

          <div className="arrows">
            <img src="imgs/arrow.png" alt="" onClick={this.animatePrev} />
            <img src="imgs/arrow.png" alt="" onClick={this.animateNext} />
          </div>
        </div>
      </div>
    );
  }
}
