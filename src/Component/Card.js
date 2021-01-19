import React from "react";

class Card extends React.Component {
  render() {
    return (
      <div className="box">
        <div className="boxleft">
          <div className="number">
            <h1>{this.props.nomor}</h1>
          </div>
          <div className="ket">
            <h4>{this.props.nama}</h4>
            <h6>{this.props.tanggal}</h6>
          </div>
        </div>
        <div className="boxright">
          <button
            className="buttonedit m-1"
            data-toggle="modal"
            data-target="#modal"
            onClick={this.props.edit}
          >
            EDIT
          </button>
          <button className="buttondelete m-1" onClick={this.props.drop}>
            DELLETE
          </button>
        </div>
      </div>
    );
  }
}

export default Card;
