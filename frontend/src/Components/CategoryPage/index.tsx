import "./category_page.scss";

import {ReactElement} from 'react';
import Toolbar from '../Toolbar';
import ProductItem from '../ProductItem';

const product1 = {
    imageUrl: "shoes.jpg",
    name: "HP Laptop 14s-dq1730nd - Laptop - 14 Inch",
    sku: "SKU",
    price: 569,
    stock_status: 1,
    stock_qty: 10,
};

function CategoryPage(): ReactElement {
    // Toolbar Top:
    //      - Grid/ListView
    //      - Sorteer op
    // Toolbar Bottom:
    //      - Paginatie
    //      - X per pagina
    return (
        <>
            <Toolbar pages={5} currentPage={1} />
            <div className="product-items grid">
                <ProductItem product={product1} />
                <ProductItem product={product1} />
                <ProductItem product={product1} />
                <ProductItem product={product1} />
            </div>
        </>
    );
}

export default CategoryPage;
