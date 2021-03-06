import { Actions } from '../constants';

const initialState = {
  channel: null,
  query: '',
  categories: [],
  relatedChannels: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case Actions.CHANNEL_SEARCH_REQUEST:
      return Object.assign({}, state, { query: action.payload });

    case Actions.ADD_CHANNEL_SUCCESS:
      return Object.assign({}, state, { channel: action.payload, isLoading: false });

    case Actions.GET_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        channel: action.payload.channel,
        isLoading: false,
        categories: action.payload.categories || [],
        relatedChannels: action.payload.relatedChannels || [],
        query: '',
      });

    case Actions.GET_CHANNEL_FAILURE:
      return Object.assign({}, state, { channel: null, isLoading: false });

    case Actions.GET_CHANNEL_REQUEST:
      return Object.assign({}, state, { channel: null, isLoading: true });

    default:
      return state;
  }
}
