import React from 'react';
import ProductHero from '../components/product/productHero';
import {
  Truck,
  ShieldCheck,
  CircleDollarSign,
  MessageCircle,
} from 'lucide-react';
import Collections from '../components/product/Collections';
import ImageSequence from '../components/product/ImageSequence';
import Footer from '../components/layout/Footer';
import ProductFooter from '../components/product/ProductFooter';

const benefits = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over $99',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    description: 'We ensure secure payment',
  },
  {
    icon: CircleDollarSign,
    title: '100% Money Back',
    description: '30 days return policy',
  },
  {
    icon: MessageCircle,
    title: 'Online Support',
    description: '24/7 dedicated support',
  },
];
const Product = () => {
  return (
    <div>
      <ProductHero />
      <section className="w-full bg-[#F4F4F5] p-8 lg:p-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex items-center gap-4 text-gray-700"
              >
                <div className="text-[#002685]">
                  <Icon className="h-8 w-8" strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm font-semibold md:text-base">
                    {benefit.title}
                  </p>

                  <p className="text-xs text-gray-500 md:text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Collections />
      <ImageSequence />
      <ProductFooter />
    </div>
  );
};

export default Product;
