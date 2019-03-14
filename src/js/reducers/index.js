import { ADD_EMPLOYEE } from "../constants/action-types";
import { CHANGE_EMPLOYEE_COUNT } from "../constants/action-types";
import { GET_EMPLOYEES } from "../constants/action-types"
import { SET_EDITING_EMPLOYEE } from "../constants/action-types"
import { SAVE_EDITED_EMPLOYEE } from "../constants/action-types"

const initialState = {
  employees: [],
  employeeAmount: "10",
  show: false,
  editingEmp: {}
};

const rootReducer = (state = initialState, action) => {
  if (action.type === ADD_EMPLOYEE) {
    return Object.assign({}, state, {
      employees: state.employees.concat(action.payload)
    });
  }
  else if(action.type === CHANGE_EMPLOYEE_COUNT) {
      //do stuff
      return Object.assign({}, state, {
        employeeAmount: action.payload
      });
  }
  else if(action.type === GET_EMPLOYEES) {
        return Object.assign({}, state, {
          employees: action.data
        }); 
  }
  else if(action.type === SET_EDITING_EMPLOYEE) {
    return Object.assign({}, state, {
      editingEmp: action.payload
    }); 
  }
  else if(action.type === SAVE_EDITED_EMPLOYEE) {
    let list = state.employees.slice();
    let pObj = list.find(person => person.login.uuid === state.editingEmp.login.uuid)

    Object.assign(pObj, state.editingEmp);
    return Object.assign({}, state, {
      employees: list
    }); 
  }

  return state;
}

// async function fetchEmployees(state = initialState) {
//     try {
//         var response = await fetch(
//           "https://randomuser.me/api/?results=" + state.employeeAmount
//         );
//       } catch (err) {
//         console.log(err);
//         alert("Failed to fetch data. Check internet connection and click 'Refresh'");
//         return;
//       }
  
//       var data = await response.json();

//       return data.results;
//       return Object.assign({}, state, {
//         employees: data
//       }); 
// }

export default rootReducer;
