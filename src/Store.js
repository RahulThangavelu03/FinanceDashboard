import { configureStore } from "@reduxjs/toolkit";

import FinanceSlice from "./Features/FinanceSlice";

const Store= configureStore({

    reducer:{
  
     Finance:FinanceSlice
    }

})

export default Store
