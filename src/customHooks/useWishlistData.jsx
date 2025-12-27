import React from 'react'
import useFetch from '../components/useFetch';
import { useState } from 'react';

const useWishlistData = async() => {

    try {
        const response = await useFetch("http://localhost:3000/wishlist",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(),
            }
        );

        if(!response.ok){
            throw "Failed to add product";
        };

        const data = await response.json();
        console.log("Product added successfully", data);
        alert("Added to wishlist ❤️");

    } catch (error) {
        console.log(error);
        alert("Something went wrong");
    }
  return (
    <>
      
    </>
  )
}

export default useWishlistData
