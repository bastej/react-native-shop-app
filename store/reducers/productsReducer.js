import PRODUCTS from "../../data/dummy-data"

const initialState = {
    allProducts = PRODUCTS,
    userProducts = PRODUCTS.filter(product => product.ownerId = 'u1'),
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default: {
            return state,
        }
    }
}

export default reducer;