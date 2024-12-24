import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";  // Importing the close icon
import productCategory from '../helpers/productCategory'  // Importing the product categories list from a helper file
import productDeal from '../helpers/productDeal'  // Importing the product categories list from a helper file
import productSubCategory from '../helpers/productSubCategory'  // Importing the product categories list from a helper file
import productStatus from '../helpers/productStatus'  // Importing the product categories list from a helper file
import { FaCloudUploadAlt } from "react-icons/fa";  // Importing the upload icon
import uploadImage from '../helpers/uploadImages';  // Importing the image upload helper function
import DisplayImage from './DisplayImage';  // Importing the component to display images in fullscreen
import { MdDelete } from 'react-icons/md'  // Importing the delete icon
import SummaryApi from '../common';
import {toast} from 'react-toastify'

// UploadProduct component definition
const UploadProduct = ({
  onClose, // onClose prop for closing the upload modal
  fetchData
}) => {

  // State to manage form input data
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    subCategory: "",
    hotDeal: "",
    productImage: [],
    description: "",
    price: "",
    item: "",
    sellingPrice: "",
    productStatus: "",
  })

  // State to manage whether fullscreen image display is open
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)

  // State to store the image URL for fullscreen display
  const [fullScreenImage, setFullScreenImage] = useState("")

  // Function to handle input change for text fields
  const handleOnChange = (e) => {
    const { name, value } = e.target

    // Updating form data state
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  // Function to handle image file upload
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0]  // Getting the selected file

    // Uploading the file using the uploadImage function
    const uploadImageCloudinary = await uploadImage(file)

    // Adding the uploaded image URL to the productImage array
    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url]
      }
    })
  }

  // Function to handle deleting an uploaded image
  const handleDeleteProductImage = async (index) => {
    console.log("image index", index)

    // Creating a new array by removing the selected image
    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)

    // Updating the productImage state
    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage]
      }
    })
  }

  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault()  // Preventing the default form submission
  
    const response = await fetch(SummaryApi.uploadProduct.url, {
      method : SummaryApi.uploadProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(data)
    })
      const responseData = await response.json()
      
      if(responseData.success){
        toast.success(responseData?.message)
        onClose()
        fetchData()
      }

      if(responseData.error){
        toast.error(responseData?.message)
      }



  }

  return (
    <div className='fixed bg-opacity-35 flex justify-center mt-10 items-center bg-slate-200
     w-full h-full bottom-0 top-0 left-0 right-0'>
        <div className='bg-white rounded p-4 w-full max-w-2xl h-full max-h-[80%]
        overflow-hidden'>
            {/* Modal header with close button */}
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg '>Upload Product</h2> 
                <div className='w-fit cursor-pointer ml-auto 
                text-2xl hover:text-red-600' onClick={onClose}>
                    <CgClose/>  {/* Close modal icon */}
                </div>
            </div>

            {/* Form for uploading product */}
            <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
              {/* Input field for product name */}
              <label htmlFor='productName'>Product Name</label>
              <input 
                type='text' 
                id='productName' 
                placeholder='Enter Product name' 
                name='productName'
                value={data.productName}
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

              {/* Input field for brand name */}
              <label htmlFor='brandName' className='mt-3'>Brand Name</label>
              <input 
                type='text' 
                id='brandName' 
                placeholder='Enter Brand Name' 
                value={data.brandName}
                name='brandName'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

              {/* Dropdown for selecting product category */}
              <label htmlFor='category' className='mt-3 '>Category</label>
              <select value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                <option value={""}>Select Category</option>
                {
                  productCategory.map((el, index) => {
                    return (
                      <option value={el.value} key={el.value + index}>{el.value}</option>
                    )
                  })
                }
              </select>

                {/* Dropdown for selecting product SUB category */}
                <label htmlFor='category' className='mt-3 '>Sub Category</label>
              <select value={data.subCategory} name='subCategory' onChange={handleOnChange} 
              className='p-2 bg-slate-100 border rounded'>
                <option value={""}>Select Sub Category</option>
                {
                  productSubCategory.map((el, index) => {
                    return (
                      <option value={el.value} key={el.value + index}>{el.value}</option>
                    )
                  })
                }
              </select>

                {/* Dropdown for selecting product deal */}
                <label htmlFor='hotDeal' className='mt-3 '>Hot deal</label>
              <select value={data.hotDeal} name='hotDeal' onChange={handleOnChange} 
              className='p-2 bg-slate-100 border rounded'>
                <option value={""}>Select Deal</option>
                {
                  productDeal.map((el, index) => {
                    return (
                      <option value={el.value} key={el.value + index}>{el.value}</option>
                    )
                  })
                }
              </select>

              {/* File upload section for product image */}
              <label htmlFor='productImage' className='mt-3 '>Product Image</label>
              <label htmlFor='uploadImageInput'>
                <div className='p-2 cursor-pointer bg-slate-100 border rounded h-32 w-full flex justify-center items-center'>
                  <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                    <span className='text-4xl'> <FaCloudUploadAlt /></span>  {/* Cloud upload icon */}
                    <p className='text-sm'>Upload Product Image</p>
                    <input type='file' id='uploadImageInput' className='hidden'
                      onChange={handleUploadProduct}/>  {/* Hidden file input */}
                  </div>
                </div>
              </label>

              {/* Display uploaded images */}
              <div>
                {
                  data?.productImage[0] ? (
                    <div className='flex items-center gap-2'>
                      {
                        data.productImage.map((el, index) => {
                          return (
                            <div className='relative group'>
                              <img src={el} 
                                alt={el}
                                width={80} 
                                height={80} 
                                className='bg-slate-100 cursor-pointer' 
                                onClick={() => {
                                  setOpenFullScreenImage(true)
                                  setFullScreenImage(el)
                                }}/>
                              <div className='absolute bg-red-600 rounded-full
                               bottom-0 right-0 p-1 text-white hidden 
                               group-hover:block cursor-pointer'
                               onClick={() => handleDeleteProductImage(index)}>
                                <MdDelete/>  {/* Delete icon */}
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  ) : (
                    <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
                  )
                }
              </div>

              {/* Input fields for price and selling price */}
              <label htmlFor='price' className='mt-3'>Price :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='Enter Price' 
                value={data.price}
                name='price'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                
              />

              <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                placeholder='Enter selling Price' 
                value={data.sellingPrice}
                name='sellingPrice'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

               {/* Input fields for item left  */}
               <label htmlFor='price' className='mt-3'>Item :</label>
              <input 
                type='number' 
                id='item' 
                placeholder='Enter item left' 
                value={data.item}
                name='item'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                
              />

              {/* Text area for product description */}
              <label htmlFor='description' className='mt-3'>Description :</label>
              <textarea className='h-28 bg-slate-100 border resize-none p-1' 
                placeholder='Enter product Description' rows={3}
                onChange={handleOnChange} name='description'
                value={data.description}>
              </textarea>

                {/* Dropdown for selecting product SUB category */}
                <label htmlFor='productStatus' className='mt-3 '>Product Status</label>
              <select value={data.productStatus} name='productStatus' onChange={handleOnChange} 
              className='p-2 bg-slate-100 border rounded'>
                <option value={""}>Select Product Status</option>
                {
                  productStatus.map((el, index) => {
                    return (
                      <option value={el.value} key={el.value + index}>{el.value}</option>
                    )
                  })
                }
              </select>

              {/* Submit button */}
              <button className='px-3 hover:bg-red-700 text-white py-2 mb-10 bg-red-600'>Upload Product</button>
            </form>

        </div>
      
      {/* Display fullscreen image */}
      {
        openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} 
            imgUrl={fullScreenImage}/>
        )
      }
    </div>
  )
}

export default UploadProduct