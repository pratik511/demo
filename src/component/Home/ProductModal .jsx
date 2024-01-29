import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get, post, put } from "../../api/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ProductModal = ({
  productData,
  setProductData,
  allDataGet,
  model,
  productCategory,
}) => {
  const [error, setError] = useState({});

  const handelOnChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const vaidation = () => {
    let formValid = true;
    let error = {};

    if (!productData?.title?.trim()) {
      formValid = false;
      error["title"] = "Please enter title";
    }

    if (!productData?.price) {
      formValid = false;
      error["price"] = "Please enter price";
    }
    if (!productData?.description?.trim()) {
      formValid = false;
      error["description"] = "Please enter description";
    }
    if (!productData?.category?.trim()) {
      formValid = false;
      error["category"] = "Please enter category";
    }
    if (!productData?.image?.trim()) {
      formValid = false;
      error["image"] = "Please enter image";
    } else if (!productData?.image?.includes("http")) {
      formValid = false;
      error["image"] = "Please enter valid image";
    }

    setError(error);
    return formValid;
  };
  const handleSubmit = () => {
    if (vaidation()) {
      const data = {
        title: productData?.title,
        price: parseFloat(productData?.price)?.toFixed(2),
        description: productData?.description,
        category: productData?.category,
        image: productData?.image,
      };
      post("products", data)
        .then((res) => {
          if (res?.status === 200) {
            toast.success("Product Create Successfully");
            setProductData({});
            allDataGet();
            model();
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  };
  const handleUpdate = () => {
    if (vaidation()) {
      const data = {
        title: productData?.title,
        price: parseFloat(productData?.price)?.toFixed(2),
        description: productData?.description,
        category: productData?.category,
        image: productData?.image,
      };
      put(`products/${productData?.id}`, data)
        .then((res) => {
          if (res?.status === 200) {
            toast.success("Product Update Successfully");
            setProductData({});
            allDataGet();
            model();
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  };

  const bindInputFloat = (value) => {
    const currentValue = value.target.value;
    const regex = new RegExp("^[0-9]*\\.?[0-9]*$");
    const keyPressed = String.fromCharCode(
      !value.charCode ? value.which : value.charCode
    );

    if (
      !regex.test(currentValue + keyPressed) ||
      (keyPressed === "." && currentValue.includes("."))
    ) {
      value.preventDefault();
      return false;
    }
  };

  return (
    <React.Fragment>
      <div className="fixed w-full h-screen z-[999] top-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)]">
        <div className="bg-white p-8 rounded shadow-md w-[440px]">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">
              Product {productData?.id ? "Update" : "Create"}
            </h1>
            <div
              className="rounded-full cursor-pointer"
              onClick={() => model()}
            >
              <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={productData?.title}
              onChange={(e) => handelOnChange(e)}
              className="mt-1 p-2 w-full border rounded"
            />
            <span className="text-xs text-red-500">{error["title"]}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price
            </label>
            <input
              type="text"
              name="price"
              onKeyPress={bindInputFloat}
              value={productData?.price}
              onChange={(e) => handelOnChange(e)}
              className="mt-1 p-2 w-full border rounded"
            />
            <span className="text-xs text-red-500">{error["price"]}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              name="description"
              value={productData?.description}
              onChange={(e) => handelOnChange(e)}
              className="mt-1 p-2 w-full border rounded"
            />
            <span className="text-xs text-red-500">{error["description"]}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>
            <select
              name="category"
              onChange={(e) => handelOnChange(e)}
              className="mt-1 p-2 w-full border rounded"
            >
              <option value="">Select Category</option>
              {productCategory?.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
            <span className="text-xs text-red-500">{error["category"]}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              image
            </label>
            <input
              type="url"
              name="image"
              value={productData?.image}
              onChange={(e) => handelOnChange(e)}
              className="mt-1 p-2 w-full border rounded"
            />
            <span className="text-xs text-red-500">{error["image"]}</span>
          </div>

          <button
            onClick={() => {
              productData?.id ? handleUpdate() : handleSubmit();
            }}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            {productData?.id ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductModal;
