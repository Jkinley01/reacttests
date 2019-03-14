import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditField(props) {
  function handleChange(e) {
    if(e === undefined || e === "") return;
    props.onchange(e.target.value)
  }

  return (
    <div>
      <Form>
        <Form.Group controlId="form-group">
          <Form.Label>Entries in table</Form.Label>
          <Form.Control
            type="number"
            aria-describedby="dataHelp"
            onChange={e => handleChange(e) }
            placeholder="10"
          />
          <Form.Text className="text-muted">
            Change amount of entries in table
          </Form.Text>
        </Form.Group>
      </Form>
      <Button variant="success" onClick={() => props.onclick()}>
        Refresh
      </Button>
    </div>
  );
}

export default EditField;