import { ADD_EMPLOYEE } from "../constants/action-types";
import { CHANGE_EMPLOYEE_COUNT } from "../constants/action-types";
import { GET_EMPLOYEES } from "../constants/action-types";
import { SET_EDITING_EMPLOYEE } from "../constants/action-types";
import { SAVE_EDITED_EMPLOYEE } from "../constants/action-types";

export const getEmployees = post => {
  return { type: GET_EMPLOYEES, data: post };
};

export function changeEmployeeCount(payload) {
  return { type: CHANGE_EMPLOYEE_COUNT, payload };
}

export function addEmployee(payload) {
  return { type: ADD_EMPLOYEE, payload };
}

export function setEditingEmployee(payload) {
  return { type: SET_EDITING_EMPLOYEE, payload };
}

export function saveEditedEmployee() {
  return { type: SAVE_EDITED_EMPLOYEE };
}

export const fetchEmployees = amount => {
  return function(dispatch, getState) {
    return fetch("https://randomuser.me/api/?results=" + amount)
      .then(data => data.json())
      .then(data => {
        dispatch(getEmployees(data.results));
      })
      .catch(err => console.log(err));
  };
};
