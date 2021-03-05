
const defaultState = {
  progress: 1,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CONTINUE':
      let newState = { ...state };
      newState.progress = newState.progress + 1;
      console.log("newstate: ", newState.progress);
      return newState
    default:
      return state
  }
}
