'use client'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import React, { useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import useData from '../hooks/useData';
import { useState } from 'react';
import InputCustom from '../components/InputCustom';
interface Product {
  id: number;
  name: string;
  veg: Boolean;
  price: number;
  description: string;
  img?: string;

}

const ProductPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [data, setData] = useState([])
  const [form, setForm] = useState({
    name: '',
    price: 0,
    veg: false,
    description: '',
  })

  const { fetchProduct } = useData('https://food-website-25pc.onrender.com/dessert', 10)

  useEffect(() => {
    if (!id) return 
      fetchProduct(Number(id)).then((result) => {

        setData(result)
        setForm({
          name: result.name || '',
          price: result.price || 0,
          veg: result.veg || false,
          description: result.description || ''
        });
      })
  }, [id])

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value })
  }


  return (
    <div className="container">
      <h1 className="row justify-content-center p-5 text-center" >{
        id ? `Edit Product` : 'Add Product'
      }</h1>
      <div className="row justify-content-center items-align-center">
        <section className="card g-2 g-lg-3 text-white form-card">
          <h5 className="col-12 text-black px-3">
            Enter the details of the product
          </h5>
          <div className="col-12">
            <form>
              <InputCustom 
                label="Name" 
                type="text"
                value={form.name}
                placeholder="Name"
                onChange={(value) => handleChange('name', value)}
                className="custom-input"
              />
              <InputCustom 
                label="Price" 
                type="number"
                value={form.price.toString()}
                placeholder="Name"
                onChange={(value) => handleChange('price', value)}
                className="inputCustom"
              />
              <InputCustom 
                label="Description" 
                type="text"
                value={form.description}
                placeholder="Name"
                onChange={(value) => handleChange('description', value)}
                className="inputCustom"
              />
              <button type="submit" className="btn btn-primary mx-2 my-2">{`${
                id ? 'Edit' : 'Add'
              } Product`}</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductPage;