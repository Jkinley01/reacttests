import React from "react";
import EditField from "./EditField";
import BootstrapTable from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { addEmployee } from "./js/actions/index";
import { changeEmployeeCount } from "./js/actions/index";
import { getEmployees } from "./js/actions/index";
import { fetchEmployees } from "./js/actions/index";
import { setEditingEmployee } from "./js/actions/index"
import { saveEditedEmployee } from "./js/actions/index"

// const mapStateToProps = state => {
//   return {
//     data: state
//   };
// };

const mapStateToProps = state => {
  return {
    employees: state.employees,
    employeeAmount: state.employeeAmount,
    show: state.show,
    editingEmp: state.editingEmp
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addEmployee: employee => dispatch(addEmployee(employee)),
    changeEmployeeCount: employeeCount => dispatch(changeEmployeeCount(employeeCount)),
    getEmployees: () => dispatch(getEmployees()),
    fetchEmployees: amount => dispatch(fetchEmployees(amount)),
    setEditingEmployee: emp => dispatch(setEditingEmployee(emp)),
    saveEditedEmployee: emp => dispatch(saveEditedEmployee(emp))
  };
}

class EmpTable extends React.Component {
  constructor() {
    super();

    this.state = { show: false };

    this.refreshResults = this.refreshResults.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateEmp = this.updateEmp.bind(this);
    this.updateEmployeeCount = this.updateEmployeeCount.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  updateEmployeeCount(e) {
    this.props.changeEmployeeCount(e);
  }

  updateEmp(e) {
    this.setState({ show: false });

    this.props.setEditingEmployee(e);
    this.props.saveEditedEmployee();
  }

  componentDidMount() {
    this.props.fetchEmployees(this.props.employeeAmount);
  }

  rowClick(id) {
    let list = this.props.employees.slice();
    let personObj = list.find(person => person.login.uuid === id);

    this.props.setEditingEmployee(personObj);

    this.setState({
      show: true
    });
  }

  refreshResults(amount) {
    this.props.fetchEmployees(this.props.employeeAmount);
  }

  render() {
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
                emp={this.props.editingEmp}
                updateEmp={this.updateEmp}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
        <EditField
          onclick={this.refreshResults}
          onchange={this.updateEmployeeCount}
          dataNum={this.props.employeeAmount}
        />
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
            {this.props.employees.map(person => (
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

const Table = connect(mapStateToProps, mapDispatchToProps)(EmpTable);

export default Table;
