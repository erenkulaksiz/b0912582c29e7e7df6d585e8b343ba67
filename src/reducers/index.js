
const defaultState = {
  hotels: [],
  hotelDetails: [],
  isLoading: {
    hotels: true,
    details: true,
  },
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
  viewSelected: 0,
  paymentDetails: {
    cvc: "",
    expiryDate: "",
    expiryYear: "",
    name: "",
    number: "",
  },
  coupon: {
    applied: false,
    discount: 0,
    code: "",
  },
  price: "",
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
    case 'SELECT_VIEW':
      state.viewSelected = action.payload;
      return state
    case 'SET_PROGRESS':
      state.progress = action.payload;
      return state
    case 'SET_SELECTIVEDATA':
      state.selectiveData = action.payload;
      return state
    case 'SET_PAYMENT':
      state.paymentDetails = action.payload;
      return state
    case 'SET_ROOMWVIEW':
      state.roomSelected = action.payload.roomSelected;
      state.viewSelected = action.payload.viewSelected;
      return state
    case 'SET_HOTELS':
      state.hotels = action.payload;
      return state
    case 'SET_DETAILS':
      state.hotelDetails = action.payload;
      return state
    case 'SET_COUPON':
      state.coupon = action.payload;
      console.log("set coupon status to >>> ", action.payload);
      return state
    case 'SET_PRICE':
      state.price = action.payload;
      return state
    default:
      return state
  }
}
