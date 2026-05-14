import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Link } from "react-router-dom";

const Breadcrumbs = ({ product }) => {
  return (
    <div className="py-2">
  <Breadcrumb>
    <BreadcrumbList className="text-slate-300">

      <BreadcrumbItem>
        <BreadcrumbLink
          asChild
          className="hover:text-cyan-300 transition-colors duration-300"
        >
          <Link to="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbSeparator className="text-slate-500" />

      <BreadcrumbItem>
        <BreadcrumbLink
          asChild
          className="hover:text-cyan-300 transition-colors duration-300"
        >
          <Link to="/product">Products</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbSeparator className="text-slate-500" />

      <BreadcrumbItem>
        <BreadcrumbPage className="text-white font-medium">
          {product?.productName}
        </BreadcrumbPage>
      </BreadcrumbItem>

    </BreadcrumbList>
  </Breadcrumb>
</div>
  );
};

export default Breadcrumbs;