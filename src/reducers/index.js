
const defaultState = {
  progress: 1,
  selectiveData: {
    selectedHotel: 0,
    startdate: new Date(),
    enddate: new Date(),
    adult: 1,
    children: 1,
  },
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CONTINUE':
      state.progress = state.progress + 1;
      return state
    case 'BACK':
      state.progress = state.progress - 1;
      return state
    case 'SELECTIVE_DATA':
      state.selectiveData = action.payload;
      return state
    default:
      return state
  }
}
