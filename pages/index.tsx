import CarouselContainer from "@/components/Home/CarouselContainer";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import Product from "@/models/Product";
import Category from "@/models/Category";
import HomeProductSwiper from "@/components/Home/HomeProductSwiper";
import CategoriesProduct from "@/components/Home/CategoriesProduct/CategoriesProducts";
import db from "../utils/db";
import { initLocalStorageData, mockProducts, getLocalProducts } from "@/utils/localData";
import { useEffect, useState } from "react";

export default function Home({ products: serverProducts }: any) {
    const [products, setProducts] = useState(serverProducts && serverProducts.length > 0 ? serverProducts : mockProducts);

    useEffect(() => {
        initLocalStorageData();
        const local = getLocalProducts();
        if (local && local.length > 0) {
            setProducts(local);
        }
    }, []);

    return (
        <>
            <Header title="Full Amazon Clone React" />
            <main className="max-w-screen-2xl mx-auto bg-gray-100">
                <CarouselContainer />
                <CategoriesProduct products={products} />
                <div className="z-10 relative">
                    <HomeProductSwiper products={products} category="women-clothing" />
                    <HomeProductSwiper products={products} category="shoes" />
                    <HomeProductSwiper products={products} category="beauty" />
                    <HomeProductSwiper products={products} category="kids" />
                </div>
            </main>
            <Footer />
            <MenuSideBar />
        </>
    );
}

export const getServerSideProps = async (context: any) => {
    try {
        await db.connectDb();
        const products = await Product.find()
            .populate({ path: "category", model: Category })
            .sort({ updatedAt: -1 })
            .lean();
        await db.disconnectDb();
        if (products && products.length > 0) {
            return {
                props: {
                    products: JSON.parse(JSON.stringify(products)),
                },
            };
        }
    } catch (error) {
        console.error("Using local data fallback for Home page.");
    }

    return {
        props: {
            products: JSON.parse(JSON.stringify(mockProducts)),
        },
    };
};


