const initState = 
   [
    { 
      name: 'nnn', 
      city: 'ccc', 
      address: 'aaaa'
    }, 
    { 
      name: 'nn22n', 
      city: 'cc22c', 
      address: 'aa22aa'
    },
    { 
      name: 'n33nn', 
      city: 'cc33c', 
      address: 'aa33aa'
    }
  ]


const shopReducer = (state = initState, action) => {
  let newState = { ...state };
  switch (action.type) {

    case 'GET_SHOPS_SUCCESS':
      console.log('get_shop success', state);  
      console.log('nnnnnnn', newState);
      newState = { ...newState, ...action.data}
      return newState;
    // case 'ADD_SHOP_ERROR':
    //   console.log('add_shop error');
    //   return state;

    case 'ADD_SHOP_SUCCESS':
      console.log('add_shop success', action.data);
      return action.data;
    case 'ADD_SHOP_ERROR':
      console.log('add_shop error');
      return state;

    case 'UPDATE_SHOP_SUCCESS':
      console.log('update_shop success');
      return state;
    case 'UPDATE_SHOP_ERROR':
      console.log('update_shop error');
      return state;

    case 'DELETE_SHOP_SUCCESS':
      console.log('delete_shop success');
      return state;
    case 'DELETE_SHOP_ERROR':
      console.log('delete_shop error');
      return state;
      
    default:
      return state;
  }
};

export default shopReducer;