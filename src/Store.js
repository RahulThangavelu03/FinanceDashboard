import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Features/AuthSlice"
import FinanceSlice from "./Features/FinanceSlice";

const Store= configureStore({

    reducer:{
    Auth:AuthSlice,
     Finance:FinanceSlice
    }

})

export default Store
