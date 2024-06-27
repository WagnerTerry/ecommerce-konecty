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
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const showProducts = async () => {
      try {
        setLoading(true)
        const products = await api.getProduct();
        setProducts(products);
        setLoading(false)

      } catch (error) {
        console.log('Erro ao buscar produtos:', error);
        setLoading(false)
      }
    };

    showProducts()
  }, [])

  const filterProducts = () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setSearchQuery('');
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setSearchQuery(searchTerm);
    }
  };

  const filterProductsByCategory = (category: string | null) => {
    setFilterCategory(category);
  };

  const filteredProducts = searchQuery
    ? searchResults
    : products.filter(product => filterCategory === null || product.category === filterCategory);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="mb-4 flex gap-4 flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Buscar produtos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 "
        />
        <button
          onClick={filterProducts}
          className="px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 focus:outline-none"
        >
          Pesquisar
        </button>
      </div>

      {searchQuery && (
        <div className="mb-4">
          <p className="text-lg font-semibold">{searchQuery}</p>
          <p className="text-sm text-gray-500">{searchResults.length} produto(s) encontrado(s)</p>
        </div>
      )}
      <div className="mb-4 flex gap-4 mt-10 flex-col sm:flex-row">
        <button
          className={`btn ${filterCategory === null ? 'btn-active' : ''}`}
          onClick={() => filterProductsByCategory(null)}
        >
          Todos
        </button>
        <button
          className={`btn ${filterCategory === 'Comidas' ? 'btn-active' : ''}`}
          onClick={() => filterProductsByCategory('Comidas')}
        >
          Comidas
        </button>
        <button
          className={`btn ${filterCategory === 'Bebidas' ? 'btn-active' : ''}`}
          onClick={() => filterProductsByCategory('Bebidas')}
        >
          Bebidas
        </button>
        <button
          className={`btn ${filterCategory === 'Outros' ? 'btn-active' : ''}`}
          onClick={() => filterProductsByCategory('Outros')}
        >
          Outros
        </button>
      </div>
      {loading ? <Loading className="absolute inset-0 m-auto size-24" />
        :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
              <img src={product.image} alt={product.name} className="w-full h-48 mb-4 rounded-lg" />
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
