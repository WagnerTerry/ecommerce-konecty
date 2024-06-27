/* eslint-disable @next/next/no-img-element */
"use client";

import { Loading } from "@/components/Loading";
import api from "@/services/api";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IProduct {
  _id: string
  name: string
  description: string
  price: string
  image: string
  createdAt: string
  category: string
}

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const showProducts = async () => {
      try {
        setLoading(true)
        const products = await api.getProduct();
        console.log('prd', products);
        setProducts(products);
        setLoading(false)

      } catch (error) {
        console.log('Erro ao buscar produtos:', error);
        setLoading(false)
      }
    };

    showProducts()
  }, [])
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {loading ? <Loading className="absolute inset-0 m-auto size-24" />
        :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4 overflow-hidden line-clamp-3">{product.description}</p>
              <p className="text-lg font-bold text-blue-600">R$ {product.price.replace('.', ',')}</p>
            </div>
          ))}
        </div>
      }
    </div>

  );
}
