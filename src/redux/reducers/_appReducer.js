const intialState = {
  user: null,
  rooms: null,
};

function AppReducer(state = intialState, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_ROOMS":
      return {
        ...state,
        rooms: action.rooms,
      };
    case "ADD_ROOM": {
      return {
        ...state,
        rooms: [...state.rooms, action.room],
      };
    }

    default:
      return state;
  }
}

export default AppReducer;
