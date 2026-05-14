import Breadcrumbs from "@/components/Breadcrums";
import Navbar from "@/components/Navbar";
import ProductDesc from "@/components/ProductDesc";
import ProductImg from "@/components/ProductImg";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SinglePages = () => {
  const params = useParams();
  const productId = params.id;

  const { products } = useSelector((store) => store.product);

  const product = products.find(
    (items) => items._id === productId
  );

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]">
  
  <Navbar />

  <div className="pt-20 md:pt-24 pb-10 md:pb-20 max-w-7xl mx-auto px-4 md:px-6">
    
    <Breadcrumbs product={product} />

    <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
      
      <ProductImg images={product.productImg} />

      <ProductDesc product={product} />

    </div>
  </div>
</div>
  );
};

export default SinglePages;
