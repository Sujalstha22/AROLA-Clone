import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { products } from '../../data/Product.js';

const Collections = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  return (
    <section ref={sectionRef} className="h-auto py-8 lg:py-16">
      {/* HEADER */}

      <div className="mb-16 space-y-4 text-center">
        <h1 className="leading-wider text-5xl text-[#002685] lg:text-5xl">
          Arola Water Collections
        </h1>

        <p className="text-base text-gray-700">
          Explore our range of pristine water
          <br className="hidden md:block" />
          products, sourced from nature and bottled with care.
        </p>
      </div>

      {/* PRODUCTS */}

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="group relative block h-full overflow-hidden transition-all duration-300"
          >
            {/* IMAGE */}

            <Link to={`/product/${product.id}`}>
              <div className="relative flex h-80 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-transparent bg-zinc-50 transition-all duration-300 hover:border-[#002685] lg:h-[30rem]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="z-10 h-full w-full object-contain transition-transform duration-1000 ease-out group-hover:scale-110"
                />
              </div>
            </Link>

            {/* INFO */}

            <div className="relative z-10 p-4">
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <h3 className="text-xl font-bold text-[#002685]">
                  {product.name}
                </h3>

                <p className="text-xl font-semibold text-gray-800">
                  {product.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;
