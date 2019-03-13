import { ADD_EMPLOYEE } from "../constants/action-types";
import { CHANGE_EMPLOYEE_COUNT } from "../constants/action-types";
import { GET_EMPLOYEES } from "../constants/action-types";

export function getEmployees() {
    return { type: GET_EMPLOYEES }
}

export function changeEmployeeCount(payload) {
    return { type: CHANGE_EMPLOYEE_COUNT, payload };
}

export function addEmployee(payload) {
  return { type: ADD_EMPLOYEE, payload };
}