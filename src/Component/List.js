import React from "react";
import "./List.css";
import Card from "./Card";
import $ from "jquery";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      agenda: [
        { judul: "Hari Peduli Sampah Nasional", tanggal: "21 Frebuari" },
        { judul: "Hari Hutan Sedunia", tanggal: "21 Maret" },
        { judul: "Hari Air Sedunia", tanggal: "22 Maret" },
        { judul: "Hari Meteorologi Sedunia", tanggal: "23 Maret" },
        { judul: "Hari Bumi", tanggal: "22 April" },
      ],
      judul: "",
      tanggal: "",
      selectedItem: null,
      action: "",
    };
  }

  SaveAgenda = (event) => {
    event.preventDefault();

    let temp = this.state.agenda;

    if (this.state.action === "insert") {
      temp.push({
        judul: this.state.judul,
        tanggal: this.state.tanggal,
      });
    } else if (this.state.action === "update") {
      let index = temp.indexOf(this.state.selectedItem);
      temp[index].judul = this.state.judul;
      temp[index].tanggal = this.state.tanggal;
    }

    this.setState({ agenda: temp });

    $("#modal").modal("hide");
  };
  Add = () => {
    this.setState({
      judul: "",
      tanggal: "",
      action: "insert",
    });
  };

  Edit = (item) => {
    this.setState({
      judul: item.judul,
      tanggal: item.tanggal,
      action: "update",
      selectedItem: item,
    });
  };

  Drop = (index) => {
    let temp = this.state.agenda;

    temp.splice(index, 1);
    this.setState({ agenda: temp });
  };

  render() {
    return (
      <div className="container-xl">
        <h2 className="text-center pt-4 mb-4 ">
          List Agenda Hari Lingkungan Hidup
        </h2>

        {this.state.agenda.map((item, index) => {
          return (
            <Card
              nama={item.judul}
              tanggal={item.tanggal}
              nomor={index + 1}
              drop={() => this.Drop(item)}
              edit={() => this.Edit(item)}
              key={index.toString()}
            />
          );
        })}
        <div className="text-center">
          <button
            className="btn btn btn-dark"
            onClick={this.Add}
            data-toggle="modal"
            data-target="#modal"
          >
            Tambah Data
          </button>
        </div>

        <div className="modal fade" id="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5>Form Agenda</h5>
              </div>
              <form onSubmit={(event) => this.SaveAgenda(event)}>
                <div className="modal-body">
                  Nama Event
                  <input
                    type="text"
                    className="form-control"
                    onChange={(ev) => this.setState({ judul: ev.target.value })}
                    value={this.state.judul}
                    required
                  />
                  Tanggal
                  <input
                    type="text"
                    className="form-control"
                    onChange={(ev) =>
                      this.setState({ tanggal: ev.target.value })
                    }
                    value={this.state.tanggal}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-dark">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
