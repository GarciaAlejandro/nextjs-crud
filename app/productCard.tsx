'use client'
import Link from "next/link";
import Image from 'next/image';
import React from "react";
import { useRouter } from 'next/router';
import useData from './hooks/useData';


interface Product {
  id: number;
  name: string;
  veg: Boolean;
  price: number;
  description: string;
  img?: string;

}
const ProductCard = ({ product, onEditProduct, onDeleteProduct }: { product: Product, onEditProduct: (id: number) => void, onDeleteProduct: (id: number) => void }) => {
  const editProduct = () => {
    console.log('Emitting product with id: ', product.id)
    onEditProduct(product.id)
  }

  const deleteProduct = () => {
    console.log('Deleting product with id: ', product.id)
    onDeleteProduct(product.id)
  }


  return (
    <div className="card container-fluid" style={{ height: '100%' }}>
      <img className="w-full" src={product.img} alt="Amazing pizza photo" />
      <div className="card-body px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black">{product.name || 'No name'} </div>
        <div className="font-bold text-xl mb-2 text-black">{product.description || 'No description'} </div>

      </div>
      <div className="row justify-content-center items-align-center px-2">
        <a onClick={editProduct} className="btn btn-secondary cursor-pointer .button m-1"> Edit </a>
        <a onClick={deleteProduct} className="btn btn-danger cursor-pointer .button m-1">Delete</a>
      </div>
    </div>
  );
}
export default ProductCard;