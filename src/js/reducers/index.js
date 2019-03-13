import { ADD_EMPLOYEE } from "../constants/action-types";
import { CHANGE_EMPLOYEE_COUNT } from "../constants/action-types";

const initialState = {
  employees: [],
  employeeAmount: "10",
  show: false,
  editingEmp: {}
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_EMPLOYEE) {
    return Object.assign({}, state, {
      employees: state.employees.concat(action.payload)
    });
  }
  else if(action.type == CHANGE_EMPLOYEE_COUNT) {
      //do stuff
      return Object.assign({}, state, {
        employeeAmount: action.payload
      });
  }
  return state;
}

export default rootReducer;
