import { createStore } from "redux";
import rootReducer from "../js/reducers/index";

const store = createStore(rootReducer);

export default store;