// Card.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Card = ({
  image,
  title,
  category,
  description,
  price,
  rating,
  setViewProductData,
}) => {
  return (
    <div className="fixed w-full h-screen z-[999] top-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
      <div className=" bg-white p-8 max-w-2xl rounded overflow-hidden shadow-lg relative">
        <div
          className="absolute top-2 right-2 bg-gray-200 rounded-full px-2 cursor-pointer hover:bg-gray-300"
          onClick={() => setViewProductData(false)}
        >
          <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
        </div>
        <img
          className="w-full h-[50vh] object-contain"
          src={image}
          alt={title}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {category}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            ${price}
          </span>
        </div>
        <div className="px-6 py-4">
          <div className="flex space-x-2">
            {Array.from({ length: rating?.rate }, (_, index) => (
              <span key={index} className="text-yellow-500">
                ⭐
              </span>
            ))}
            ({rating?.count})
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
