import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { 
  increaseQuantity, 
  decreaseQuantity, 
  removeFromCart 
} from "../../features/cart/cartSlice";

const CartDrawer = ({ isOpen, onClose }) => {
  const drawerRef = useRef(null);
  const dispatch = useDispatch();
  const { items, totalAmount, totalCount } = useSelector((state) => state.cart);

  // 1. Handle Click Outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // 2. Lock Body Scroll when open
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        ref={drawerRef}
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-gray-700" />
            <span className="font-bold text-lg tracking-wide">
              MY BAG ({totalCount})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
              <ShoppingBag size={64} className="text-gray-300" />
              <p className="font-medium text-lg">Your bag is empty.</p>
              <button 
                onClick={onClose}
                className="text-red-600 font-bold hover:underline"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                {/* Image */}
                <div className="h-28 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100 border border-gray-200">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                         <h4 className="text-sm font-bold text-gray-600 uppercase">
                          {item.brand}
                        </h4>
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <button 
                        onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                         <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-semibold border border-gray-200">
                        Size: {item.size}
                      </span>
                    </div>
                  </div>

                  {/* Price & Qty */}
                  <div className="flex items-end justify-between">
                    <div className="flex items-center border border-gray-300 rounded-sm">
                      <button 
                        onClick={() => dispatch(decreaseQuantity({ id: item.id, size: item.size }))}
                        className="p-1 px-2 hover:bg-gray-100 text-gray-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button 
                         onClick={() => dispatch(increaseQuantity({ id: item.id, size: item.size }))}
                        className="p-1 px-2 hover:bg-gray-100 text-gray-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-gray-900">
                      ₹{item.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-gray-50 space-y-4">
            <div className="flex items-center justify-between text-lg font-bold text-gray-900">
               <span>Total</span>
               <span>₹{totalAmount.toLocaleString()}</span>
            </div>
            <button className="w-full bg-red-600 text-white font-bold py-3.5 rounded-md hover:bg-red-700 active:scale-[0.98] transition-all shadow-md">
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;