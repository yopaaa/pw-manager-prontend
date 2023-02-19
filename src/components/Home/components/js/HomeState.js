import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  getData: {
    _id: null,
    name: null,
  },
  category: [],
  ModalContent: null,
  refreshTable: null,
  getdatapath: null
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setGetData: (state, action) => {
      const key = Object.keys(action.payload)
      key.map((val) => {
        state.getData[val] = action.payload[val]
        return state.getData
      })
    },
    setModalContent: (state, action) => {
      state.ModalContent = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setrefreshTable: (state, action) => {
      state.refreshTable = action.payload
    },
    setgetdatapath: (state, action) => {
      state.getdatapath = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setGetData, setModalContent, setCategory, setrefreshTable, setgetdatapath } = counterSlice.actions

export default counterSlice.reducer
