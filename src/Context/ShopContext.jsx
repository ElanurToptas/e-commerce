import React, {createContext} from 'react'
import all_products from '../Components/Assets/Frontend_Assets/all_product'

export const ShopContext = createContext(null); // ShopContext ile global state oluşturuyoruz.

const ShopContextProvider = (props) => {
    const contexValue = {all_products};

    return (
        <ShopContext.Provider value={contexValue}>
            {props.children}
            </ShopContext.Provider>
    )
}

export default ShopContextProvider; // ShopContextProvider bileşenini dışa aktarıyoruz.
