import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Productlist = ({Products}) => {
const [productList, setProductsList] = useState(Products);
  const router = useRouter();

  const fetchFashion = async () => {
    const response = await fetch(
      "http://localhost:4000/products?category=Fashion"
    );
    const data = await response.json();
    setProductsList(data);
    router.push("/products?category=Fashion", undefined, { shallow: true });
  };

  const fetchElectronics = async () => {
    const response = await fetch(
      "http://localhost:4000/products?category=Electronics"
    );
    const data = await response.json();
    setProductsList(data);
    router.push("/products?category=Electronics", undefined, { shallow: true });
  };

  const clearFilter = async () => {
    const response = await fetch(
      "http://localhost:4000/products"
    );
    const data = await response.json();
    setProductsList(data);
    router.push("/products", undefined, { shallow: true });
  };

  const fetchGroceries = async () => {
    const response = await fetch(
      "http://localhost:4000/products?category=Groceries"
    );
    const data = await response.json();
    setProductsList(data);
    router.push("/products?category=Groceries", undefined, { shallow: true });
  };

    return (
        <div>
          <div class="row">
          <div class="column">
         <button onClick={fetchFashion} style={{width:'100%'}}>Fashion Products</button>
         </div>
         <div class="column">
         <button onClick={fetchElectronics} style={{width:'100%'}}>Electronic Products</button>
         </div>
         <div class="column">
         <button onClick={fetchGroceries} style={{width:'100%'}}>Groceries</button>
         </div>
         <div class="column">
         <button onClick={clearFilter} style={{width:'100%'}}>Clear Filter</button>
         </div>
         </div>
        <h1>Product List</h1>
        <ul>
          {productList.map((product) => (
            <Link href={`/products/${product.name}`} key={product.id}>
            <li key={product.id}>
              <h2>{product.name}</h2>
              <div>{product.price}</div>
              <div>{product.category}</div>
              <br></br>
              <hr />
            </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  };

  export const getStaticProps = async (context) => {
   const { params } = context;
    const queryString = params ? `?category=${params?.category}` : "";
    const response = await fetch(`http://localhost:4000/products${queryString}`);
    const data = await response.json();
    return {
        props: 
        {
            Products: data,
        },
        revalidate: 10
  };
  };
  

  export default Productlist;
