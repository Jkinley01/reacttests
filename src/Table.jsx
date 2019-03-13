import React, { useState } from "react";
import EditField from "./EditField";
import BootstrapTable from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      datAmt: props.dataNum || "10",
      show: false,
      editingEmp: {}
    };

    this.refreshResults = this.refreshResults.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateEmp = this.updateEmp.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  updateEmp(e) {
    this.setState({ editingEmp: e, show: false });

    let list = this.state.tableData.slice();
    let personObj = list.find(
      person => person.login.uuid === e.login.uuid
    );

    Object.assign(personObj, this.state.editingEmp);
    this.setState({ tableData: list });
  }

  async componentDidMount() {
    var response = await fetch(
      "https://randomuser.me/api/?results=" + this.state.datAmt
    );

    var data = await response.json();
    this.setState({ tableData: data.results });
  }

  rowClick(id) {
    let list = this.state.tableData.slice();
    let personObj = list.find(person => person.login.uuid === id);

    this.setState({
      show: true,
      editingEmp: Object.create(personObj)
    });
  }

  async refreshResults(amount) {
    var response = await fetch("https://randomuser.me/api/?results=" + amount);
    var data = await response.json();
    await this.setState({ tableData: data.results });
  }

  render() {
    const { tableData } = this.state;

    return (
      <div id="tableDiv">
        <div>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.show}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Employee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ModalFormBody
                emp={this.state.editingEmp}
                updateEmp={this.updateEmp}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <EditField onclick={this.refreshResults} dataNum={this.state.datAmt} />
        <BootstrapTable striped bordered hover variant="dark" id="empTbl">
          <thead>
            <tr>
              <th>First</th>
              <th>Last</th>
              <th>DOB</th>
              <th>Location</th>
              <th>Cell</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(person => (
              <tr
                key={person.login.uuid}
                onClick={() => this.rowClick(person.login.uuid)}
              >
                <td>{person.name.first}</td>
                <td>{person.name.last}</td>
                <td>{person.dob.date}</td>
                <td>{person.location.city + ", " + person.location.state}</td>
                <td>{person.cell}</td>
                <td>{person.gender}</td>
              </tr>
            ))}
          </tbody>
        </BootstrapTable>
      </div>
    );
  }
}

function ModalFormBody(props) {
  function editDOB(e) {
    if (e.target.value === undefined || e.target.value === "") return;
    props.emp.dob.date = new Date(e.target.value).toISOString();
  }

  function dateString(s) {
    if (s === undefined || s === "") return;
    return new Date(s).toISOString().split("T")[0];
  }

  function saveEmp() {
    props.updateEmp(props.emp);
  }

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            defaultValue={props.emp.name.first}
            onChange={e => (props.emp.name.first = e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            defaultValue={props.emp.name.last}
            onChange={e => (props.emp.name.last = e.target.value)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridDOB">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="D.O.B"
            defaultValue={dateString(props.emp.dob.date)}
            onChange={editDOB}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="fromGridGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            placeholder="Unspecified"
            defaultValue={props.emp.gender}
            onChange={e => (props.emp.gender = e.target.value)}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridAddress2">
        <Form.Label>State</Form.Label>
        <Form.Control
          placeholder="Someplace"
          defaultValue={props.emp.location.state}
          onChange={e => (props.emp.location.state = e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formGridCell">
        <Form.Label>Cell #</Form.Label>
        <Form.Control
          placeholder="123-456-7890"
          defaultValue={props.emp.cell}
          onChange={e => (props.emp.cell = e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={saveEmp}>
        Submit
      </Button>
    </Form>
  );
}

export default Table;
