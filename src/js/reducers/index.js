import { ADD_EMPLOYEE } from "../constants/action-types";

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
          });    }
    return state;
  }
  
  export default rootReducer;