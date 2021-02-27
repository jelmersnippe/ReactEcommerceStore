import './category_page.scss';

import React, {FunctionComponent, useEffect, useState} from 'react';
import Toolbar from '../../components/Toolbar';
import ProductItem from '../../components/ProductItem';
import {useLocation} from 'react-router-dom';
import api from '../../config/api';
import {CategoryDTO, ProductDTO} from '../../generated';

type LocationState = { category: CategoryDTO };

const CategoryPage: FunctionComponent = () => {
    const {state} = useLocation<LocationState>();

    const [products, setProducts] = useState<Array<ProductDTO>>([]);

    useEffect(() => {
        (async () => {
            const response = await api.category.findProducts(state.category.id);
            setProducts(response.data);
        })();
    }, [state]);

    // Toolbar Top:
    //      - Grid/ListView
    //      - Sorteer op
    // Toolbar Bottom:
    //      - Paginatie
    //      - X per pagina
    return (
        <>
            <Toolbar pages={5} currentPage={1}/>
            <h2>{state.category.title}</h2>
            {
                products.length > 0 &&
                <div className="product-items grid">
                    {
                        products.map((product: ProductDTO) => {
                            return <ProductItem product={product} key={product.sku}/>;
                        })
                    }
                </div>
            }
        </>
    );
};

export default CategoryPage;
