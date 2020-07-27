import ProductService from '@/Services/ProductService'

export const namespaced = true

export const state = () => ({
  products: null,
  product: {},
  totalProduct: 0,
  cart: []
})

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_PRODUCT(state, product) {
    state.product = product
  },
  SET_PRODUCTS_TOTAL(state, totalProduct) {
    state.totalProduct = totalProduct
  },

  SET_CART_FROM_LOCALSTORAGE(state, cartData) {
    state.cart = cartData
  },
  //Add and remove cart item
  PUSH_PRODUCT_TO_CART(state, addedProduct) {
    state.cart.push(addedProduct)
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  INCREASE_PRODUCT_QUANTITY(state, cartItem) {
    cartItem.quantity++
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  DELETE_A_PRODUCT(state, cartItem) {
    cartItem.quantity--
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }
}

export const actions = {
  async getProducts({ commit }, { perPage, page }) {
    try {
      const { data, headers } = await ProductService.getProducts(perPage, page)
      await commit('SET_PRODUCTS_TOTAL', parseInt(headers['x-total-count']))
      await commit('SET_PRODUCTS', data)
    } catch (err) {
      console.log(err)
    }
  },
  async getProduct({ commit, state, getters }, id) {
    try {
      if (id == state.product) {
        return state.product
      }

      const product = getters.getProductById(id)

      if (product) {
        commit('SET_PRODUCT', product)
        return product
      }
      const { data } = await ProductService.getProductById(id)
      commit('SET_PRODUCT', data)
      return data
    } catch (err) {
      console.log(err)
    }
  },
  addToCart({ commit, state }, addedProduct) {
    console.log('addedProduct', addedProduct)
    const cartItem = state.cart.find(item => item.id === addedProduct.id)
    if (!cartItem) {
      commit('PUSH_PRODUCT_TO_CART', addedProduct)
    } else {
      commit('INCREASE_PRODUCT_QUANTITY', cartItem)
    }
  },
  removeProductFormCart({ commit, state }, productId) {
    const cartItem = state.cart.find(item => item.id === productId)
    if (cartItem) {
      commit('DELETE_A_PRODUCT', cartItem)
    }
  }
}

export const getters = {
  cartLength(state) {
    let total = 0
    state.cart.forEach(product => {
      total += product.quantity
    })
    return total
  },
  getProductById(state) {
    id => state.products.find(product => product.id === id)
  }
}
