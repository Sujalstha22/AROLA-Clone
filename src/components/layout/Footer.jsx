import webXlogo from "../../assets/webx-logo.png";
import footerBackground from "../../assets/image.png";
const products = [
  "BLACK WATER",
  "WHITE WATER",
  "BLUE SPRING",
  "SPARKLING WATER",
  "PEAK FLOW",
  "PREMIUM GLASS",
];

const links = ["HOME", "OUR STORY", "PRODUCTS", "CONTACT"];

export default function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${footerBackground})`,
      }}
    >
      <div className="relative max-w-7xl mx-auto px-8 lg:px-8 py-2">
        <div className="flex flex-col lg:flex-row justify-between gap-26">
          {/* Left Section */}
          <div className="flex-1">
            <h2 className="text-xl font-bold uppercase mb-5">Products</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-7">
              {products.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm lg:text-md uppercase leading-6 hover:text-gray-300 transition"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-end gap-5 mt-20">
              <h1 className="text-3xl font-extrabold tracking-tight">AROLA</h1>

              <p className="text-sm text-gray-200">© 2026 ARQLA</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:text-right">
            <h2 className="text-xl font-bold uppercase mb-5">Quick Links</h2>

            <div className="flex flex-wrap justify-start lg:justify-end gap-8 lg:gap-12">
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="uppercase text-sm lg:text-md hover:text-gray-300 transition"
                >
                  {link}
                </a>
              ))}
            </div>

            <div className="mt-20 flex justify-start lg:justify-end items-center gap-3">
              <span className="uppercase text-sm text-gray-200">
                Design and Developed by
              </span>

              <img src={webXlogo} alt="WebX" className="h-8 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
