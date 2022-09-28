import { Component } from "react";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      efname: "",
      eage: "",
      ecity: "",
      ecountry: "",
    };
  }

  editOnChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div
        className={
          this.props.modal ? "modal display-block" : "modal display-none"
        }
      >
        <section className="modal-main">
          {/* <h4 key={this.props.children.id}>{this.props.children.fname}</h4>
          <h4>{this.props.children.city}</h4>
          <h4>{this.props.children.age}</h4> */}

          {/* <form onSubmit={(e) => this.formHandler(e)}> */}
          <form>
            {/* <form action="http://localhost:5000/formPost/" method="post"> */}
            <input
              type="text"
              placeholder="Name"
              name="fname"
              value={this.props.children.fname}
              onChange={(e) => this.editOnChange(e)}
            />
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={this.props.children.age}
              onChange={(e) => this.editOnChange(e)}
            />
            <input
              type="text"
              placeholder="City"
              name="city"
              value={this.props.children.city}
              onChange={(e) => this.editOnChange(e)}
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={this.props.children.country}
              onChange={(e) => this.editOnChange(e)}
            />
          </form>

          <button
            type="button"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={this.props.closeModal}
          >
            Save Details
          </button>
          <button
            style={{ backgroundColor: "#FF0000", color: "white" }}
            onClick={this.props.closeModal}
          >
            Cancel
          </button>
        </section>
      </div>
    );
  }
}

export default Modal;
