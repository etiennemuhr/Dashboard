import React from "react";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import PrivateRoute from "./components/routing/PrivateRoute";

import "./index.css";

import AuthState from "./context/auth/AuthState";
import ReceiptState from "./context/receipt/ReceiptState";

import setAuthToken from "./utils/setAuthToken";

import Home from "./pages/Home";
import Customer from "./pages/Customer";
import LoginPage from "./pages/LoginPage";
import Customers from "./pages/Customers";
import AddCustomers from "./pages/AddCustomer";
import Receipts from "./pages/ReceiptList";
import AddReceipt from "./pages/AddReceipt";
import Settings from "./pages/Settings";
import Receipt from "./pages/Receipt";
import Logout from "./pages/Logout";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ReceiptState>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Router>
           <Switch>
              <Route path="/" exact component={LoginPage} />
              <Navbar>
                <PrivateRoute path="/home" exact component={Home} />
                <PrivateRoute path="/customers" exact component={Customers} />
                <PrivateRoute
                  path="/addcustomer"
                  exact
                  component={AddCustomers}
                />
                <PrivateRoute path="/customer/:id" exact component={Customer} />
                <PrivateRoute path="/receipts" exact component={Receipts} />
                <PrivateRoute path="/addreceipt" exact component={AddReceipt} />
                <PrivateRoute path="/settings" exact component={Settings} />
                <PrivateRoute path="/receipts/:id" exact component={Receipt} />
                <PrivateRoute path="/logout" exact component={Logout} />
              </Navbar>
            </Switch>
             {/* <Switch>
              {/* <Route path="/" exact component={LoginPage} />
              <Navbar>
                <Route path="/" exact component={Home} />
                <Route path="/customers" exact component={Customers} />
                <Route
                  path="/addcustomer"
                  exact
                  component={AddCustomers}
                />
                <Route path="/customer/:id" exact component={Customer} />
                <Route path="/receipts" exact component={Receipts} />
                <Route path="/addreceipt" exact component={AddReceipt} />
                <Route path="/settings" exact component={Settings} />
                <Route path="/receipts/:id" exact component={Receipt} />
                <Route path="/logout" exact component={Logout} />
              </Navbar>
            </Switch> */}
          </Router>
        </SnackbarProvider>
      </ReceiptState>
    </AuthState>
  );
}

export default App;
