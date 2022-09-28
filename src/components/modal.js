import { Component } from "react";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div
        className={
          this.props.modal ? "modal display-block" : "modal display-none"
        }
      >
        <section className="modal-main">
          <h4 key={this.props.children.id}>{this.props.children.fname}</h4>
          <h4>{this.props.children.city}</h4>
          <h4>{this.props.children.age}</h4>
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
