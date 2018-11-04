import React, { Component } from "react";
import axios from "axios";
import "./SignUpLogIn.css";

export default class SignUpLogIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password2: ""
        }
    }

    componentDidMount() {
        document.getElementById('signup-button').addEventListener('click', () => {
            document.querySelector('.user_options-forms').classList.remove('bounceRight')
            document.querySelector('.user_options-forms').classList.add('bounceLeft')
        }, false);

        document.getElementById('login-button').addEventListener('click', () => {
            document.querySelector('.user_options-forms').classList.remove('bounceLeft')
            document.querySelector('.user_options-forms').classList.add('bounceRight')
        }, false);
    }


    onChange = e => {
        this.setState({ [e.target.name]: e.target.value }, () => { console.log(this.state) });
    }

    addUser = (e) => {
        e.preventDefault();

        let userData = {
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        axios.post("/users/register", userData)
            .then(function (response) {
                console.log("user added successfully");
                document.querySelector('.user_options-forms').classList.remove('bounceLeft');
                document.querySelector('.user_options-forms').classList.add('bounceRight');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    login = e => {
        e.preventDefault();

        let userData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post("/users/login", userData)
            .then(function (response) {
                console.log("user login successfully");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="user">
                <div className="user_options-container">
                    <div className="user_options-text">
                        <div className="user_options">
                            <h2 className="user-title">Don't have an account?</h2>
                            <p className="user-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
                            <button className="user-signup-login" id="signup-button">Sign up</button>
                        </div>

                        <div className="user_options">
                            <h2 className="user-title">Have an account?</h2>
                            <p className="user-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
                            <button className="user-signup-login" id="login-button">Login</button>
                        </div>
                    </div>

                    <div className="user_options-forms">
                        <div className="user_forms-login">
                            <h2 className="forms_title">Login</h2>
                            <form className="forms_form">
                                <fieldset className="forms_fieldset">
                                    <div className="forms_field">
                                        <input type="email" name="email" placeholder="Email" className="forms_field-input" onChange={this.onChange} required autoFocus />
                                    </div>
                                    <div className="forms_field">
                                        <input type="password" name="password" placeholder="Password" className="forms_field-input" onChange={this.onChange} required />
                                    </div>
                                </fieldset>
                                <div className="forms_buttons">
                                    <button type="button" className="forms_buttons-forgot">Forgot password?</button>
                                    <input type="submit" value="Log In" className="forms_buttons-action" onClick={this.login} />
                                </div>
                            </form>
                        </div>
                        <div className="user_forms-signup">
                            <h2 className="forms_title">Sign Up</h2>
                            <form className="forms_form" onSubmit={this.addUser}>
                                <fieldset className="forms_fieldset">
                                    <div className="forms_field">
                                        <input type="email" name="email" placeholder="Email" className="forms_field-input" onChange={this.onChange} required />
                                    </div>
                                    <div className="forms_field">
                                        <input type="password" name="password" placeholder="Password" className="forms_field-input" onChange={this.onChange} required />
                                    </div>
                                    <div className="forms_field">
                                        <input type="password" name="password2" placeholder="Confirm Password" className="forms_field-input" onChange={this.onChange} required />
                                    </div>
                                </fieldset>
                                <div className="forms_buttons">
                                    <input type="submit" value="Sign up" className="forms_buttons-action" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
