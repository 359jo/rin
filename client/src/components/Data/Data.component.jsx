import React, { Component } from 'react';
import './Data.css';

export default class Data extends Component {
    constructor() {
        super()
        this.state = {
            pageNumber: 0,
        };
    }

    onPageDown = () => {
        if (this.state.pageNumber < 4) {
            this.setState({
                pageNumber: this.state.pageNumber + 1
            }, () => {
                console.log(this.state);
                document.querySelector('.data-pages').style.top = `${-this.state.pageNumber * 100}vh`;

            });
        }


    }

    onPageUp = () => {
        if (this.state.pageNumber > 0) {
            this.setState({
                pageNumber: this.state.pageNumber - 1
            }, () => {
                console.log(this.state);
                document.querySelector('.data-pages').style.top = `${-this.state.pageNumber * 100}vh`;
            });
        }
    }


    render() {
        return (
            <div className="data fadeInFast">
                <div className="data-pages">
                    <div className="page">this is page 1</div>
                    <div className="page">this is page 2</div>
                    <div className="page">this is page 3</div>
                    <div className="page">this is page 4</div>
                    <div className="page">this is page 5</div>
                </div>
                <div className="arrows">
                    <img src="imgs/arrow.png" alt="" onClick={this.onPageUp} />
                    <img src="imgs/arrow.png" alt="" onClick={this.onPageDown} />
                </div>
            </div>
        )
    }
}
