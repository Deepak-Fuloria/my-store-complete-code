import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allProducts: [],
  filterProducts: [],
  status: "idle",
};

const productSlice = createSlice({
  name: "Products",
  initialState: initialState,
  reducers: {
    setAllProducts: (state, actions) => {
      state.allProducts = actions.payload;
      if (state.filterProducts.length === 0) {
        state.filterProducts = actions.payload;
      }
    },

    setCategory: (state, actions) => {
      // console.log("actions", actions);
      state.category = actions.payload;
    },

    searchFilter: (state, actions) => {
      state.filterProducts = state.allProducts.filter((element) => {
        const newElement = element.title.toLowerCase();
        return newElement.includes(actions.payload.toLowerCase());
      });

      console.log("reached here", state.filterProducts);
    },

    filterByCategory: (state, actions) => {
      if (actions.payload.toLowerCase() === "all") {
        state.filterProducts = state.allProducts;
      } else {
        state.filterProducts = state.allProducts.filter((element) => {
          return (
            element.category.toLowerCase() === actions.payload.toLowerCase()
          );
        });
      }
    },

    filterByCompany: (state, actions) => {
      state.filterProducts = state.allProducts.filter((element) => {
        return element.brand.toLowerCase() === actions.payload.toLowerCase();
      });
    },
    filterByPrice: (state, actions) => {
      state.filterProducts = state.allProducts.filter((element) => {
        return +element.price <= +actions.payload;
      });
    },
  },

  // --------------------------------------------------------------------------------------------
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state, actions) => {
      state.status = "loading";
    });

    builder.addCase(fetchProduct.fulfilled, (state, actions) => {
      state.allProducts = actions.payload;
      if (state.filterProducts.length === 0) {
        state.filterProducts = actions.payload;
      }
      // state.filterProducts = actions.payload;
      state.status = "idle";
    });

    builder.addCase(fetchProduct.rejected, (state, actions) => {
      state.status = "error";
    });
  },
  // --------------------------------------------------------------------------------
});

export const {
  setAllProducts,
  searchFilter,
  filterByCategory,
  setCategory,
  filterByCompany,
  filterByPrice,
  setCurrentItems,
} = productSlice.actions;

export default productSlice.reducer;

// redux thunk

export const fetchProduct = createAsyncThunk("produts/fetch", async () => {
  // console.log("reached here", "rechd");
  const { data } = await axios.get("/fetchAllproducts");
  // console.log("reached here", data);

  return data;
});
