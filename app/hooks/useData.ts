import { useEffect, useState } from "react";

const useData = (url: string,maxProducts: number) => {

  const fetchProducts = async () => {
    try {
      const jsonData = await fetch(url);
      const data = await jsonData.json();
      return data.slice(0, maxProducts)
    } catch (error) {
      console.error(error);
    }
  
  }

  const fetchProduct = async (id: number) => {
    try {
      const jsonData = await fetch(`${url}/${id}`);
      const data = await jsonData.json();
      console.log({data})
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const jsonData = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      const data = await jsonData.json();
      return data;
    } catch (error) {
      throw new Error;
    }
  }

  const editProduct = async (id: number, body: any) => {
    try {
      const jsonData = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await jsonData.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error;
    }
  }

  const addProduct = async (body: any) => {
    try {
      console.log({body});
      const jsonData = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await jsonData.json();
      console.log({data})
      return data;
    } catch (error) {
      console.error(error);
      throw new Error;
    }
  }


  return { fetchProducts, fetchProduct, addProduct, deleteProduct };
}

export default useData;