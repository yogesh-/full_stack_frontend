import { Component } from "react";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      fname: "",
      age: "",
      city: "",
      country: "",
    };
  }

  editOnChange = (e) => {
    console.log(this.state);
    this.setState({ ...this.props.children, [e.target.name]: e.target.value });
  };

  updateUser = (user) => {
    fetch("http://localhost:5000/update_user/" + user.id, {
      method: "PUT",
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
    this.props.closeModal();
  };

  render() {
    return (
      <div
        className={
          this.props.modal ? "modal display-block" : "modal display-none"
        }
      >
        <section className="modal-main">
          <form>
            <input
              type="text"
              placeholder="Name"
              name="fname"
              defaultValue={this.props.children.fname}
              onChange={(e) => this.editOnChange(e)}
            />
            <input
              type="number"
              placeholder="Age"
              name="age"
              defaultValue={this.props.children.age}
              onChange={(e) => this.editOnChange(e)}
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              defaultValue={this.props.children.city}
              onChange={(e) => this.editOnChange(e)}
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              defaultValue={this.props.children.country}
              onChange={(e) => this.editOnChange(e)}
            />
            <button
              type="button"
              style={{ backgroundColor: "green", color: "white" }}
              onClick={() => this.updateUser(this.props.children)}
            >
              Save Details
            </button>
            <button
              style={{ backgroundColor: "#FF0000", color: "white" }}
              onClick={this.props.closeModal}
            >
              Cancel
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default Modal;
