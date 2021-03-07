
const defaultState = {
  progress: 1,
  selectiveData: {
    selectedHotel: 0,
    startdate: null,
    enddate: null,
    adult: 1,
    children: 1,
    child_status: true,
    max_adult_size: 5,
  },
  roomSelected: 0,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CONTINUE':
      state.progress = state.progress + 1;
      console.log("progress went to ", state.progress);
      return state
    case 'BACK':
      state.progress = state.progress - 1;
      return state
    case 'SELECTIVE_DATA':
      state.selectiveData = action.payload;
      return state
    case 'SELECT_ROOM':
      state.roomSelected = action.payload;
      return state
    default:
      return state
  }
}
