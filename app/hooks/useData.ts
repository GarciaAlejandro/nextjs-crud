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

    }
  }


  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data.slice(0, maxProducts));
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log('--------------------')
  //   console.log('Fetching data')
  //   console.log('--------------------')
  // }, [url]);

  return { fetchProducts, fetchProduct };
}

export default useData;