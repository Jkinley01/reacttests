import { ADD_EMPLOYEE } from "../constants/action-types";

export function addEmployee(payload) {
    return { type: ADD_EMPLOYEE, payload }
  };