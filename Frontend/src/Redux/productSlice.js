import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState:{
        products: [],
        cart: [],
        addresses: [],
        selectedAddress: null,
    },
    reducers: {
        // Actions
        setProducts:(state, action) => {
            state.products = action.payload
        },
         
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload);
        },
        addAddress: (state, action) => {
            if(!state.addresses) state.addresses = [];
            state.addresses.push(action.payload);
        },
        setSelectedAddress: (state, action) => {
            state.selectedAddress = action.payload;
        },
        deleteAddress: (state, action) => {
            state.addresses = state.addresses.filter((_, idx) => idx !== action.payload);

            // If the deleted address was the selected one, reset selectedAddress
            if(state.selectedAddress === action.payload) {
                state.selectedAddress = null;
            }   
        }
    }
})

export const { setCart, setProducts, removeFromCart, addAddress, setSelectedAddress, deleteAddress } = productSlice.actions
export default productSlice.reducer