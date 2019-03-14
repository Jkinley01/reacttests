import { ADD_EMPLOYEE } from "../constants/action-types";
import { CHANGE_EMPLOYEE_COUNT } from "../constants/action-types";
import { GET_EMPLOYEES } from "../constants/action-types"
import { SET_EDITING_EMPLOYEE } from "../constants/action-types"
import { SAVE_EDITED_EMPLOYEE } from "../constants/action-types"
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  employees: [],
  employeeAmount: "10",
  show: false,
  editingEmp: {}
});

const rootReducer = (state = initialState, action) => {
  //state = Immutable.fromJS(state);

  if (action.type === ADD_EMPLOYEE) {
    let lst = state.get('employees');
    lst.concat(action.payload);
    return state.set('employees', lst);
  }
  else if(action.type === CHANGE_EMPLOYEE_COUNT) {
      return state.set('employeeAmount', action.payload);
  }
  else if(action.type === GET_EMPLOYEES) {
    return state.set('employees', action.data);
  }
  else if(action.type === SET_EDITING_EMPLOYEE) {
    return state.set('editingEmp', action.payload);
  }
  else if(action.type === SAVE_EDITED_EMPLOYEE) {
    let lst = state.get('employees');
    let editObj = state.get('editingEmp');

    let pObj = lst.find(person => person.login.uuid === editObj.login.uuid);
    
    Object.assign(pObj, editObj);

    return state.set('employees', lst);
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
