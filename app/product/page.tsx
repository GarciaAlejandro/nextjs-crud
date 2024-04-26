'use client'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import React, { useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import useData from '../hooks/useData';
import { useState } from 'react';
import InputCustom from '../components/InputCustom';
import { useRouter } from 'next/navigation';

interface ID{
  id?: number;
}
const ProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [data, setData] = useState([])
  const [form, setForm] = useState({
    name: '',
    price: 0,
    veg: false,
    description: '',
  })

  const { fetchProduct, addProduct, editProduct } = useData('https://food-website-25pc.onrender.com/dessert', 10)

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

  const handleSubmit = async () => id ? onEditProduct(id) : onAddProduct()
  const onEditProduct = async (id: any) => {
    const rawForm = JSON.parse(JSON.stringify(form))
    const productToEdit = {
      name: rawForm.name,
      price: rawForm.price,
      description: rawForm.description,
      img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/dessert/cornetto-double-chocolate.acc21849ac732f2f85998ad73e532d40.1.jpg?width=522',
      quantity: 1,
      
    }
    const ID = (data as ID).id || undefined
    await editProduct(ID || id,productToEdit)
    onBack()
  }
  const onAddProduct = async () => {
    const rawForm = JSON.parse(JSON.stringify(form))
    const newProduct = {
      ...rawForm,
      quantity: 1,
      img: 'https://api.pizzahut.io/v1/content/en-in/in-1/images/dessert/cornetto-double-chocolate.acc21849ac732f2f85998ad73e532d40.1.jpg?width=522'
    }
    await addProduct(newProduct)
    onBack()
  }
  const onBack = () => {
    router.push('/')
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
              placeholder="Description about the product"
              onChange={(value) => handleChange('description', value)}
              className="inputCustom"
            />
            <div className="row justify-content-center">
                <a onClick={handleSubmit} className="btn btn-primary col-6 mx-2 my-2">{`${
                  id ? 'Edit' : 'Add'
                } Product`}</a>
                <div className="btn btn-primary col-6 mx-2 my-2" onClick={onBack}>
                  Back to Product List
                </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductPage;