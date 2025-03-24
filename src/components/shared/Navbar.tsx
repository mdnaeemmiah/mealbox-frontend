
"use client";

import Link from "next/link";
import Image from "next/image";
import {useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Grid, Drawer, Row, Col } from 'antd';
import { useEffect } from "react";
import { Badge, Typography, Divider } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { removeFromCart, updateQuantity } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCreateOrderMutation } from "@/redux/features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import img1 from '../../app/assets/download1.png'
import { useRouter } from "next/navigation";


const { useBreakpoint } = Grid;
const { Title, Text } = Typography;



// Cart Drawer (Ant Design)
const CartDrawer = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);

  const [createOrder, { isLoading, isSuccess, data, isError, error }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    await createOrder({ products: cartData.items });
  };

  useEffect(() => {
    if (isLoading) toast.loading("Processing ...");
    if (isSuccess) {
      toast.success(data?.message);
      if (data?.data) {
        setTimeout(() => (window.location.href = data.data), 1000);
      }
    }
    if (isError) toast.error(JSON.stringify(error));
  }, [isLoading, isSuccess, isError, data, error]);

  return (
    <Drawer title="Your Cart" placement="right" onClose={() => setOpen(false)} open={open} width={400}>
      {cartData.items.length > 0 ? (
        <>
          <div style={{ maxHeight: 400, overflowY: "auto" }}>
            {cartData.items.map((item) => (
              <Row key={item.product} gutter={16} align="middle" style={{ marginBottom: 16 }}>
                <Col span={6}>
               
                </Col>
                <Col span={10}>
                  <Title level={5}>{item.name}</Title>
                  <div className="flex items-center gap-2 mt-1">
                    <Button size="lg" onClick={() => dispatch(updateQuantity({ id: item.product, quantity: Math.max(item.quantity - 1, 1) }))}>
                      -
                    </Button>
                    <Text strong>{item.quantity}</Text>
                    <Button size="lg" onClick={() => dispatch(updateQuantity({ id: item.product, quantity: Math.min(item.quantity + 1, item.stock) }))}>
                      +
                    </Button>
                  </div>
                </Col>
                <Col span={6}>
                  <Text strong>${(item.quantity * item.price).toFixed(2)}</Text>
                </Col>
                <Col span={2}>
                  <Button   variant="link"  onClick={() => dispatch(removeFromCart(item.product))}>
                    X
                  </Button>
                </Col>
              </Row>
            ))}
          </div>

          <Divider />

          <Row justify="space-between">
            <Text>Total Quantity:</Text>
            <Text strong>{cartData.totalQuantity}</Text>
          </Row>
          <Row justify="space-between" style={{ marginBottom: 16 }}>
            <Text>Total Price:</Text>
            <Text strong>${cartData.totalPrice.toFixed(2)}</Text>
          </Row>

          <Button
            type="submit"
            onClick={handlePlaceOrder}
            className="bg-gradient-to-r from-blue-500 to-black text-white font-bold py-3 rounded-lg shadow-lg hover:from-black hover:to-blue-500 transition-all duration-300 ease-in-out"
          >
            Place Order  hello
          </Button>
        </>
      ) : (
        <Text type="secondary">Your cart is empty.</Text>
      )}
    </Drawer>
  );
};

// Cart Sheet (ShadCN)
const CartSheet = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);
  const [createOrder, { isLoading, isSuccess, data, isError, error }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    await createOrder({ products: cartData.items.map(({ product, quantity }) => ({ product, quantity })) } );
    console.log('cartData.items 18', cartData.items);
  };

  useEffect(() => {
    if (isLoading) toast.loading("Processing ...");
    if (isSuccess) {
      toast.success(data?.message);
      if (data?.data) {
        setTimeout(() => (window.location.href = data.data), 1000);
      }
    }
    if (isError) toast.error(JSON.stringify(error));
  }, [isLoading, isSuccess, isError, data, error]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="relative pt-4 rounded" style={{ padding: '8px' }}>
          <ShoppingCartOutlined style={{ fontSize: 30, color: "red" }} /> {/* Font size 30 and red color */}
          <Badge count={cartData.totalQuantity} className="absolute right-0 top-0" />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Review your items and proceed to checkout.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {cartData.items.length > 0 ? (
            <ul className="space-y-4">
              {cartData.items.map((item) => (
                <li key={item.product} className="flex items-center gap-4">
                 
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Button size="lg" onClick={() => dispatch(updateQuantity({ id: item.product, quantity: Math.max(item.quantity - 1, 1) }))}>
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button size="lg" onClick={() => dispatch(updateQuantity({ id: item.product, quantity: Math.min(item.quantity + 1, item.stock) }))}>
                        +
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
                  <Button variant="link" className="bg-orange-600" onClick={() => dispatch(removeFromCart(item.product))}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        <SheetFooter className="border-t pt-4">
          <SheetClose asChild>
            <Button
              variant="link"
              onClick={handlePlaceOrder}
              className="bg-gradient-to-r from-blue-500 to-black text-white font-bold py-3 rounded-lg shadow-lg hover:from-black hover:to-blue-500 transition-all duration-300 ease-in-out"
            >
              Place Order  naeem
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

// Cart Container (Switches Between AntD & ShadCN)
const CartContainer = () => {
  const screens = useBreakpoint();
  const [open, setOpen] = useState(false);

  return screens.md ? <CartSheet /> : <CartDrawer open={open} setOpen={setOpen} />;
};

// Navbar Component
export default function Navbar() {
  // const user = useAppSelector(selectCurrentUser);
 const user = useAppSelector((state) => state.auth.user);
 const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const defaultAvatar = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";
  const userRole = useAppSelector((state) => state?.auth?.user?.role) || "customer";
  const router = useRouter();

  const dashboardRoute =
    userRole === "mealProvider" ? "/dashboard/provider/providerDashboard" :
    userRole === "customer" ? "/dashboard/customer/customerDashboard" :
    "/dashboard";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully logged out!"); 
    setTimeout(() => {
      router.push("/login"); 
    }, 1500); 
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md relative">
      {/* Left Side: Logo & Name */}
      <Link href="/" className="flex items-center gap-2">
        <Image height={40} width={40} src={img1} alt="image" />
        <span className="text-lg font-bold">Meal Hub</span>
      </Link>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/providerPost" className="hover:text-blue-600">Meal</Link>
        <Link href="/customerPost" className="hover:text-blue-600">Meal-Preference</Link>
        <Link href="/abouts" className="hover:text-blue-600">About Us</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact Us</Link>
        <CartContainer />
      </div>

      {/* Hamburger Menu for Small Devices */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Right Side: Login Button or User Avatar */}
      <div>
        {!user ? (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={defaultAvatar} alt="User Avatar" />
                <AvatarFallback>{ "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={dashboardRoute} className="cursor-pointer">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Mobile Menu (for small screens) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-10">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/providerPost" className="hover:text-blue-600">Meal</Link>
            <Link href="/customerPost" className="hover:text-blue-600">Meal-Preference</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact Us</Link>
            <CartContainer />
          </div>
        </div>
      )}
    </nav>
  );
}