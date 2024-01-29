import React, { useEffect, useState } from "react";
import { del, get } from "../../api/base";
import Card from "./ViewProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ProductModal from "./ProductModal ";
import { toast } from "react-toastify";

const ProductTable = () => {
  const [productData, setProductData] = useState([]);
  const [viewProductData, setViewProductData] = useState(false);
  const [productModel, setProductModel] = useState(false);
  const [singleProductData, setSingleProductData] = useState({});
  const [productCategory, setProductCategory] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    if (viewProductData || productModel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [viewProductData, productModel]);

  const model = () => {
    setProductModel(!productModel);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      filter(searchFilter);
    }, 1000);

    return () => clearTimeout(getData);
  }, [searchFilter]);

  useEffect(() => {
    allDataGet();
    getCategory();
  }, []);

  const allDataGet = () => {
    get("products")
      .then((res) => {
        setProductData(res?.data);
      })
      .catch((err) => toast.error("Something went wrong"));
  };

  const getCategory = () => {
    get("products/categories")
      .then((res) => {
        setProductCategory(res?.data);
      })
      .catch((err) => console.log("err", err));
  };

  const handelonDelete = (id) => {
    del(`products/${id}`)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Product Deleted Successfully");
          allDataGet();
        }
      })
      .catch((err) => toast.error("Something went wrong"));
  };

  const filter = (keyword) => {
    if (keyword !== "") {
      const results = productData.filter((user) => {
        return user.title.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setProductData(results);
    } else {
      allDataGet();
    }
  };

  const handelOnFilter = (category) => {
    if (category !== "") {
      get(`products/category/${category}`)
        .then((res) => {
          setProductData(res?.data);
        })
        .catch((err) => toast.error("Something went wrong"));
    } else {
      allDataGet();
    }
  };

  return (
    <React.Fragment>
      <div className="container mx-auto relative overflow-x-auto mt-14">
        <div className="flex items-center justify-between p-4 bg-gray-200">
          {/* Button */}
          <button
            className="bg-blue-400 text-white py-2 px-4 rounded"
            onClick={() => model()}
          >
            Create Product
          </button>

          <h1 className="fa-2x">Product List</h1>

          <div className="flex">
            {/* Dropdown */}
            <select
              name="category"
              onChange={(e) => handelOnFilter(e.target.value)}
              className="p-2 w-full border rounded me-2"
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

            {/* Search Bar */}
            <div className="flex items-center">
              <input
                type="search"
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search title..."
                className="py-2 px-4 border rounded-l"
              />
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Title
              </th>
              <th scope="col" className="px-6 py-3">
                Product Price
              </th>
              <th scope="col" className="px-6 py-3">
                Product Description
              </th>
              <th scope="col" className="px-6 py-3">
                Product Category
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productData?.map((item) => {
              return (
                <tr key={item?.id} className="border-b">
                  <td className="px-6 py-4">{item?.title}</td>
                  <td className="px-6 py-4">{item?.price}</td>
                  <td className="px-6 py-4">{item?.description}</td>
                  <td className="px-6 py-4">{item?.category}</td>
                  <td className="px-6 py-4">
                    <div className="px-6 py-4">
                      <div className="flex space-x-2">
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => setViewProductData(item)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </span>
                        <span
                          className="text-yellow-500 cursor-pointer"
                          onClick={() => {
                            setSingleProductData(item);
                            model();
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </span>
                        <span
                          className="text-red-500 cursor-pointer"
                          onClick={() => handelonDelete(item?.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {viewProductData && (
        <Card {...viewProductData} setViewProductData={setViewProductData} />
      )}
      {productModel && (
        <ProductModal
          productData={singleProductData}
          setProductData={setSingleProductData}
          productCategory={productCategory}
          allDataGet={allDataGet}
          model={model}
        />
      )}
    </React.Fragment>
  );
};

export default ProductTable;
