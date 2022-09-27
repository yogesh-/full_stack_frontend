import { Component } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: 1,
      fname: "",
      age: "",
      city: "",
      country: "",
      apiResponse: "",
    };
  }

  toggleHandler(index) {
    this.setState({ toggle: index });
  }

  onChange = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteUser = (userId) => {
    console.log(userId);
    // e.preventDefault();
    fetch("http://localhost:5000/delete/" + userId, {
      method: "DELETE",
      body: JSON.stringify({
        id: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    console.log("deleted user is" + userId);
    this.dataLoader();
  };

  formHandler(e) {
    e.preventDefault();

    fetch("http://localhost:5000/formPost", {
      method: "POST",
      body: JSON.stringify({
        fname: this.state.fname,
        age: this.state.age,
        city: this.state.city,
        country: this.state.country,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    console.log("formhandler in action");

    // clear form fields after submit
    this.setState({
      fname: "",
      age: "",
      city: "",
      country: "",
    });
  }

  dataLoader = async () => {
    let response = await fetch("http://localhost:5000/read_db");
    let data = await response.json();
    this.setState({ apiResponse: data });
    console.log(data);
  };

  render() {
    return (
      <div className="App">
        <div className="app-container">
          <div className="tabs-row">
            <button
              className={this.state.toggle === 1 ? "tabs active-tabs" : "tabs"}
              onClick={() => this.toggleHandler(1)}
            >
              Register
            </button>
            <button
              className={this.state.toggle === 2 ? "tabs active-tabs" : "tabs"}
              onClick={() => {
                this.toggleHandler(2);
                this.dataLoader();
              }}
            >
              View Data
            </button>
            <button
              className={this.state.toggle === 3 ? "tabs active-tabs" : "tabs"}
              onClick={() => this.toggleHandler(3)}
            >
              Edit
            </button>
          </div>
          <div className="data-box">
            {this.state.toggle === 1 ? (
              <>
                <form onSubmit={(e) => this.formHandler(e)}>
                  {/* <form action="http://localhost:5000/formPost/" method="post"> */}
                  <input
                    type="text"
                    placeholder="Name"
                    name="fname"
                    value={this.state.fname}
                    onChange={(e) => this.onChange(e)}
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={this.state.age}
                    onChange={(e) => this.onChange(e)}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={this.state.city}
                    onChange={(e) => this.onChange(e)}
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={this.state.country}
                    onChange={(e) => this.onChange(e)}
                  />

                  <button>Submit</button>
                </form>
              </>
            ) : this.state.toggle === 2 ? (
              <>
                <h3>Fetched from Database</h3>
                {this.state.apiResponse.length > 0 ? (
                  this.state.apiResponse.map((item) => (
                    <ul>
                      <li key={item.id} style={{ listStyleType: "none" }}>
                        <div className="user-card">
                          <div className="card-content">
                            Name: {item.fname} | Age: {item.age} | City:{" "}
                            {item.city}
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))
                ) : (
                  <>
                    <p>Loading...</p>
                  </>
                )}
              </>
            ) : (
              <>
                <h3>Edit or Delete</h3>
                {this.state.apiResponse.length > 0 ? (
                  this.state.apiResponse.map((item) => (
                    <ul>
                      <li key={item.id} style={{ listStyleType: "none" }}>
                        <div className="user-card">
                          <div className="card-content">
                            <div className="user-details">
                              Name: {item.fname} | Age: {item.age} | City:{" "}
                              {item.city}{" "}
                            </div>
                            <div className="icons-bar">
                              <FaEdit />{" "}
                              <AiFillDelete
                                onClick={() => {
                                  this.deleteUser(item.id);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))
                ) : (
                  <>
                    <p>Loading...</p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs;
