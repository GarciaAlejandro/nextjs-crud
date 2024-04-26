'use client'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import Image from "next/image";
import ProductCard from "./productCard";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import useData from './hooks/useData';
import InputCustom from "./components/InputCustom";
import Modal from "./components/Modal";

export default function Home() {

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);
  const [search, setSearch] = useState('');

  const {fetchProducts, deleteProduct} = useData('https://food-website-25pc.onrender.com/dessert', 10)

    
  const router = useRouter();
  const handleNavigate = (id: number) => {
    router.push(`/product?id=${id}`);
  }

  useEffect(() => {
    setLoading(true);
    fetchProducts().then((result) => {
      console.log({result})
      setData(result)
      setLoading(false);
    }) 
  }, [])

  const onDeleteProduct = async (id : number) => {
    
    setIdToDelete(undefined);
    
    if(!id) return;
    try {
      await deleteProduct(id)
      const filteredData = data?.filter((item: any) => item.id !== idToDelete) ?? [];

      if(filteredData.length){
        setData(filteredData);
      }
      
    } catch (error){
      console.error(error)
    } finally{
      setIsOpen(false);
    }
    

  }
  const editProduct = async (id : number) => {
    console.log(`Editing product with id: ${id}`)
    handleNavigate(id)
  }
  const onToggleModal = () => {
    setIsOpen(!isOpen)
  }
  const onShowDeleteModal = (id: number | undefined) => {
    setIdToDelete(id)
    onToggleModal()
  }

  return (
    <main className="container-fluid full-height-container">
      <h3 className="text-center m-5"> Product List </h3>
      <div className="row justify-content-center align-items-center px-5"  style={{height: 'auto'}}>
      <div className="row justify-content-center align-items-center px-5"  style={{height: 'auto'}}>
        <a href="/product" className="btn btn-primary col-lg-2 col-sm-12 col-xs-12 col-md-12 my-2">Add Product</a>
      </div>
      </div>
      <div className="row justify-content-center align-items-center p-5"  style={{height: 'auto'}}>
        {
          data && data.length
            ? data.map((item: any, index: any) => (
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-4 col-xl-3 p-6 py-2 full-height" key={index} >
                  <ProductCard
                    product={item}
                    onEditProduct={editProduct}
                    onDeleteProduct={onShowDeleteModal}
                  />
                </div>
              ))
            : !loading ?  
                <p className="text-center p-8"> No products found </p>
                : <p className="text-center p-8"> Loading... </p>

        }
      </div>
      <div className="text-black container-fluid">
        {
          isOpen &&
            <Modal onClose={onToggleModal}>
              <div className="row justify-content-center">
                <h6 className="text-center">Are you sure you want to delete this product?</h6>
                <div className="row justify-content-center">
                  <a className="btn btn-danger m-2 col-2" onClick={() => onDeleteProduct(idToDelete!)}>Yes</a>
                  <a className="btn btn-primary m-2 col-2" onClick={onToggleModal}>No</a>
                </div>
              </div>
            </Modal>
        }
      </div>
    </main>
  );
}
