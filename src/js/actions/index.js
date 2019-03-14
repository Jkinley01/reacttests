import { ADD_EMPLOYEE } from "../constants/action-types";
import { CHANGE_EMPLOYEE_COUNT } from "../constants/action-types";
import { GET_EMPLOYEES } from "../constants/action-types";
import store from "../store/index";

export const getEmployees = post => {
  return { type: GET_EMPLOYEES, data: post };
};

// export function getEmployees() {
//     return { type: GET_EMPLOYEES, data: post }
// }

export function changeEmployeeCount(payload) {
  return { type: CHANGE_EMPLOYEE_COUNT, payload };
}

export function addEmployee(payload) {
  return { type: ADD_EMPLOYEE, payload };
}

export const thunk_action_creator = amount => {
  // try {
  //   var response = await fetch(
  //     "https://randomuser.me/api/?results=" + state.employeeAmount
  //   );
  // } catch (err) {
  //   console.log(err);
  //   alert("Failed to fetch data. Check internet connection and click 'Refresh'");
  //   return;
  // }

  // var data = await response.json();

  // return data.results;

  //store.dispatch(getEmployees());

  return function(dispatch, getState) {
    return fetch("https://randomuser.me/api/?results=" + amount)
      .then(data => data.json())
      .then(data => {
        if (data.message === "Not Found") {
          throw new Error("No such user found!!");
        } else 
        {
          dispatch(getEmployees(data.results));
        }
      })
      .catch(err => console.log(err));
  };
};
