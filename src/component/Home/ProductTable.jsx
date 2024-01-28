import React, { useEffect, useState } from 'react'
import { get } from '../../api/base'

const ProductTable = () => {
    const [productData, setProductData] = useState([])
    console.log("productData", productData);

    useEffect(() => {
        allDataGet()
    }, [])

    const allDataGet = () => {
        get("products").then((res) => {
            setProductData(res?.data)
        }).catch((err) =>
            console.log("err", err)
        )
    }


    return (
        <React.Fragment>
            <div className="container mx-auto relative overflow-x-auto mt-14">
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
                                <tr className="border-b">
                                    <td className="px-6 py-4">
                                        {item?.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item?.category}
                                    </td>
                                    <td className="px-6 py-4">
                                        $2999
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default ProductTable