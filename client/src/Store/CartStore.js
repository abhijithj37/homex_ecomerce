import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware'
//THIS ZUSTAND STORE ONLY USING FOR GETTING CART LENGTH TO DISPLAY ON NAVBAR

const CartStore = (set) => ({
    currentUserCart: [],
    setUserCartzustand: (newcart) => set({ currentUserCart: newcart }),
})

const useUserCart = create(
    devtools(
        persist(CartStore, {
            name: "usercart",
        })
    )
)
export default useUserCart;

