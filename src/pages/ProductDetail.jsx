import { useParams } from 'react-router-dom';
import { products } from '../data/Product.js';

const ProductDetail = () => {
  const { productId } = useParams();

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1>Product not found</h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#002685] text-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* BOTTLE */}

        <div className="flex items-center justify-center p-10">
          <img
            src={product.image}
            alt={product.name}
            className="h-[70vh] w-full object-contain"
          />
        </div>

        {/* CONTENT */}

        <div className="flex flex-col justify-center p-10 lg:p-20">
          <span className="text-sm font-bold tracking-[0.25em] text-blue-300 uppercase">
            {product.category}
          </span>

          <h1 className="mt-4 text-5xl lg:text-7xl">{product.name}</h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-blue-100">
            {product.description}
          </p>

          <div className="mt-10 flex gap-10 border-t border-white/20 pt-8">
            <div>
              <p className="text-xs font-bold tracking-widest text-blue-300 uppercase">
                Price
              </p>

              <p className="mt-2 text-3xl font-bold">{product.price}</p>
            </div>

            <div className="h-10 w-px bg-white/20" />

            <div>
              <p className="text-xs font-bold tracking-widest text-blue-300 uppercase">
                Size
              </p>

              <p className="mt-2 text-2xl font-bold">{product.size}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
