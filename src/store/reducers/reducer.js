const initialState = { filmFavoris: [] }

function reducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'ADD': // Exemple pour ajouter une valeur
      nextState = {
        ...state,
        filmFavoris: [...state.filmFavoris, action.value]
      };
      console.log(nextState.filmFavoris)
      return nextState || state
    case 'REMOVE': // Exemple pour supprimer une valeur
      nextState = {
        ...state,
        filmFavoris: state.filmFavoris.filter(id => id !== action.value )
      };
      console.log(nextState.filmFavoris)
      return nextState || state
    case 'ACTIONNAME':
        // Code here
      return nextState || state
    default:
      return state
  };
}

export default reducer;