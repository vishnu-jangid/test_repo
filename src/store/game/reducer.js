import * as types from './types';

const initialState = {
  games:[],
  totalCount: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GAMES: {
      if (action?.payload?.status === 200) {
        let games = action?.payload?.data?.items
        let totalCount = action?.payload?.data?.total_count
        return {
          ...state,
          games: games,
          totalCount: totalCount
        };
      } else {
        return { ...state }
      }
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
