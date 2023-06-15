import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ProductModel } from "../../../../../libs/models/shops/catalogs/ProductModels";
import { useAppDispatch, useAppSelector } from "../../../../../libs/store";
import { AuthSelector } from "../../../../../libs/store/Auth";
import {
  GetAllProductsByOwner,
  ProductSelector,
  UpdateProductEntity,
} from "../../../../../libs/store/Catalog";
import {
  convertSelectedImageToBase64,
  ProductCategories,
} from "../../../../../libs/utils/common";
import { ProductProps } from "../ViewEditProduct";

const EditForm: React.FC<ProductProps> = (props) => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("Default");
  const [summary, setSummary] = useState<string>("");
  const [description, setDescrition] = useState<string>("");
  const [imageFile, setImageFile] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [itemsInStock, setItemsInStock] = useState<string>("");

  const dispatch = useAppDispatch();
  const { product, isEditing } = useAppSelector(ProductSelector);
  const { user } = useAppSelector(AuthSelector);
  const [slide, setSlide] = useState<boolean>(true);
  const slideToggle = () => setSlide(!slide);

  useEffect(() => {
    setName(props.data.name);
    setCategory(props.data.category);
    setSummary(props.data.summary);
    setDescrition(props.data.description);
    setPrice(props.data.price.toString());
    setItemsInStock(props.data.itemsInStock.toString());
    setImageFile(props.data.imageFile);
  }, []);

  const updateProduct = async () => {
    await dispatch(
      UpdateProductEntity({
        id: props.data.id,
        name: name,
        category: category,
        summary: summary,
        imageFile: imageFile,
        description: description,
        price: Number(price),
        itemsInStock: Number(itemsInStock),
        userId: String(user?.email),
        slug: "",
      })
    );
    if (!isEditing) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        text: "Product updated successfully",
        showConfirmButton: false,
        timer: 1500,
        width: "400px",
        imageWidth: 10,
        imageHeight: 10,
      });
      await dispatch(GetAllProductsByOwner(user?.email));
      props.setIsOpen(!props.isOpen);
    }
  };

  return (
    <>
      <div className="w-full py-6 flex sm:flex-col md:flex-col lg:flex-row xl:flex-row justify-center items-center bg-white ">
        <div className="w-full lg:ml-6 mb-6">
          <div className="relative">
            <div className="slider">
              <div className="slide-ana flex flex-shrink-0">
                <div
                  className={
                    "flex flex-shrink-0 transform " +
                    (slide ? "translate-x-0" : "-translate-x-full")
                  }
                >
                  <img
                    className=" lg:block hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                  <img
                    className=" hidden md:block lg:hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                  <img
                    className=" block md:hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                </div>
                <div
                  className={
                    "flex flex-shrink-0 transform " +
                    (slide ? "translate-x-full" : "translate-x-0")
                  }
                >
                  <img
                    className=" lg:block hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                  <img
                    className=" hidden md:block lg:hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                  <img
                    className=" block md:hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                </div>
              </div>
            </div>
            <div className=" transition duration-150 absolute bottom-0 w-full h-full flex justify-between items-center px-4">
              <button
                onClick={slideToggle}
                aria-label="previous"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full flex justify-center items-center"
              >
                <svg
                  className=""
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26" cy="26" r="26" fill="white" />
                  <path
                    d="M28.4987 19.333L21.832 25.9997L28.4987 32.6663"
                    stroke="#4B5563"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={slideToggle}
                aria-label="Next"
                className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full flex justify-center items-center"
              >
                <svg
                  className=""
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26" cy="26" r="26" fill="white" />
                  <path
                    d="M23.5013 19.333L30.168 25.9997L23.5013 32.6663"
                    stroke="#4B5563"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="lg:mt-0 flex justify-start items-start w-full flex-col mx-6 sm:px-3 mb-6">
          <div className="bg-white">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                // addNewProduct();
              }}
            >
              <div className="bg-white">
                <div className="p-5 flex justify-between">
                  <div className="space-y-1 md:w-6/12">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Produc Name
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        autoComplete="name"
                        required
                        className={`appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500`}
                        onChange={(
                          event: React.FormEvent<HTMLInputElement>
                        ) => {
                          setName(event?.currentTarget?.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1 md:w-5/12">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <div className="mt-1">
                      <select
                        id="category"
                        name="category"
                        value={category}
                        required
                        className={`appearance-none bg-white w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500
                                            `}
                        onChange={(event: any) => {
                          setCategory(event.currentTarget.value);
                        }}
                      >
                        <option value={category} className="text-gray-900 py-4">
                          {category}
                        </option>
                        {ProductCategories.map((category, index) => {
                          return (
                            <option
                              key={index}
                              value={category.name}
                              className="text-gray-900 py-4"
                            >
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-5 flex justify-between">
                  <div className="space-y-1 md:w-6/12">
                    <label
                      htmlFor="summary"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Summary
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={4}
                        id="summary"
                        name="summary"
                        value={summary}
                        autoComplete="summary"
                        required
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500`}
                        onChange={(event: any) => {
                          setSummary(event?.currentTarget?.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1 w-5/12">
                    <div className="w-full">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price
                      </label>
                      <div className="mt-1">
                        <input
                          id="price"
                          name="price"
                          type="number"
                          value={price}
                          autoComplete="price"
                          required
                          className={`appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                                                    focus:ring-orange-500 focus:border-orange-500
                                                `}
                          onChange={(
                            event: React.FormEvent<HTMLInputElement>
                          ) => {
                            setPrice(event?.currentTarget?.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Items in Stock
                      </label>
                      <div className="mt-1">
                        <input
                          id="stock"
                          name="stock"
                          type="number"
                          value={itemsInStock}
                          autoComplete="stock"
                          required
                          className={`appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                                                    focus:ring-orange-500 focus:border-orange-500
                                                `}
                          onChange={(
                            event: React.FormEvent<HTMLInputElement>
                          ) => {
                            setItemsInStock(event.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={3}
                        id="description"
                        value={description}
                        name="description"
                        autoComplete="description"
                        required
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                                            focus:ring-orange-500 focus:border-orange-500
                                            `}
                        onChange={(event: any) => {
                          setDescrition(event?.currentTarget?.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-5">
                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Image Files
                    </label>
                    <div className="mt-1">
                      <input
                        id="image"
                        name="image"
                        type="file"
                        autoComplete="imageFile"
                        required
                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500`}
                        onChange={(
                          event: React.FormEvent<HTMLInputElement>
                        ) => {
                          const files = event.currentTarget.files;

                          if (!files || !files[0]) {
                            return;
                          } else {
                            convertSelectedImageToBase64(
                              files[0],
                              (result: string) => {
                                setImageFile(result);
                                console.log(imageFile);
                              }
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end px-4 py-3 sm:px-6">
                  <button
                    type="submit"
                    onClick={() => updateProduct()}
                    className="capitalize ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Update Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>
        {` 
                .slider {
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                }

                .slide-ana {
                    height: 539px;
                }   

                .slide-ana > div {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    transition: all 1s;
                }
            `}
      </style>
    </>
  );
};

export default EditForm;
