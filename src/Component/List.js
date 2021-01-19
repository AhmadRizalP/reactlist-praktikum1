import React from "react";
import "./List.css";
import Card from "./Card";
import $ from "jquery";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      agenda: [
        { nama: "Hari Peduli Sampah Nasional", tanggal: "21 Frebuari" },
        { nama: "Hari Hutan Sedunia", tanggal: "21 Maret" },
        { nama: "Hari Air Sedunia", tanggal: "22 Maret" },
        { nama: "Hari Meteorologi Sedunia", tanggal: "23 Maret" },
        { nama: "Hari Bumi", tanggal: "22 April" },
      ],
      nama: "",
      tanggal: "",
      action: "",
    };
  }

  SaveAgenda = (event) => {
    event.preventDefault();
    let temp = this.state.agenda;

    if (this.state.action === "insert") {
      temp.push({
        nama: this.state.nama,
        tanggal: this.state.tanggal,
      });
    } else if (this.state.action === "update") {
      let index = temp.findIndex((item) => item.nama === this.state.nama);

      temp[index].nama = this.state.nama;
      temp[index].tanggal = this.state.tanggal;
    }
    this.setState({ agenda: temp });

    $("#modal").modal("hide");
  };
  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  Add = () => {
    this.setState({
      nama: "",
      tanggal: "",
      action: "insert",
    });
  };

  Edit = (item) => {
    this.setState({
      nama: item.nama,
      tanggal: item.tanggal,
      action: "update",
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
              nama={item.nama}
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
              <form onSubmit={this.SaveAgenda}>
                <div className="modal-body">
                  Nama Event
                  <input
                    type="text"
                    name="nama"
                    className="form-control"
                    onChange={this.bind}
                    value={this.state.nama}
                  />
                  Tanggal
                  <input
                    type="text"
                    name="tanggal"
                    className="form-control"
                    onChange={this.bind}
                    value={this.state.tanggal}
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
