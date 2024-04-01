import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    //===== in case it's state domain and the event name...
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdrawl":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);
const showState = store.getState();

// ==== Redux THe code before working with action creators.....

/*

store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch({ type: "account/withdrawl", payload: 200 });
console.log(store.getState());
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Buy A Car" },
});
console.log(store.getState());
store.dispatch({ type: "account/payLoan" });
console.log(store.getState());

*/

// ==== Redux lec: 264.. WOrking with action creators...

// == Back in the day the developers write string like  in separate variable see line 59.. In modern react it is not  working..
// const ACCOUNT_DEPOSIT = "account/deposit";

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdrawl(amount) {
  return { type: "account/withdrawl", payload: amount };
}

function requestLoan(price, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: price, purpose: purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdrawl(200));

// console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy A Car"));
console.log(store.getState());

store.dispatch(payLoan());
// console.log(store.getState());

// ==== Redux lec: 265.. Adding more state customers..

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Muhammad Azeem", 12345));
store.dispatch(deposit(2000));
console.log(store.getState());
