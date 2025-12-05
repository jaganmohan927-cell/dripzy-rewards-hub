import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-card rounded-xl overflow-hidden border border-border card-hover">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold text-sm">
              View Details
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="font-semibold text-foreground mt-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xl font-bold text-primary">₹{product.price}</span>
            <span className="text-xs text-muted-foreground">
              {product.sizes.length} sizes
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
