import React, { Component } from "react";
import { AuthContext } from "../context/AuthContext";

export default class AccPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      token: "",
      userInfo: {
        id: "",
        email: "",
        userName: "",
      },
    };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  onChangeForm(e) {
    if (e.target.name == "email") {
      this.setState({ email: e.target.value });
    } else if (e.target.name == "password") {
      this.setState({ password: e.target.value });
    }
  }
  async loginHandler(e) {
    e.preventDefault();

    // делаем POST запрос на сервер для авторизации

    await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // При удачном ответе - выставляем состояни и вызываем метод авторизации
        this.setState({ token: res.token });
        this.setState({ userInfo: res.userInfo });
        this.context.login(res.token, res.userInfo.id);
      })
      // .catch(console.log('err'));
  }
  async registerHandler(e) {
    e.preventDefault();

    await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        // При удачном ответе - выставляем состояни и вызываем метод авторизации
        // this.setState({ token: res.token });
        // this.setState({ userInfo: res.userInfo });
        // this.context.login(res.token, res.userInfo.id);
      });
  }
  render() {
    const auth = this.context;
    console.log(auth);
    return (
      <div className="container">
        <form>
          {this.state.token}
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(e) => {
                this.onChangeForm(e);
              }}
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                this.onChangeForm(e);
              }}
            />
          </div>
          {/* Делаем проверку на то, что пользователь авторизовался, если true - ыводится кнопка регистрации, если false - кнопко логина */}
          {!auth.isAuth ? (
            <div>
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  this.loginHandler(e);
                }}
              >
                Login
              </button>
              <button
                className="btn btn-success"
                onClick={(e) => {
                  this.registerHandler(e);
                }}
              >
                Register
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={(e) => {
                console.log('На главную')
              }}
            >
              На главную
            </button>
          )}
        </form>
      </div>
    );
  }
}
AccPage.contextType = AuthContext;
