import './category_page.scss';

import React, {FunctionComponent, useEffect, useState} from 'react';
import Toolbar from '../Toolbar';
import ProductItem from '../ProductItem';
import {useLocation, useParams} from 'react-router-dom';
import api from '../../config/api';
import {ProductDTO} from '../../generated';

type RouteParams = { slug: string };
type LocationState = { id: string }

const CategoryPage: FunctionComponent = () => {
    const {slug} = useParams<RouteParams>();
    console.log(slug);
    const {state} = useLocation<LocationState>();

    const [products, setProducts] = useState<Array<ProductDTO>>([]);

    useEffect(() => {
        (async () => {
            const response = await api.category.findProducts(state.id);
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
            {
                products.length > 0 &&
                <div className="product-items grid">
                    {
                        products.map((product: ProductDTO) => {
                            return <ProductItem product={product} key={product.sku}/>
                        })
                    }
                </div>
            }
        </>
    );
};

export default CategoryPage;
