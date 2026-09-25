import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import MenuSideBar from "@/components/Header/MenuSidebar";
import ProductPage from "@/components/ProductPage/ProductPage";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";
import { mockProducts } from "@/utils/localData";

const SingleProduct = ({ product }: any) => {
    if (!product) return null;
    return (
        <>
            <Header title={product.name || "Product Detail"} />
            <main className="bg-white w-full">
                <ProductPage product={product} />
            </main>
            <Footer />
            <MenuSideBar />
        </>
    );
};

export default SingleProduct;

export const getServerSideProps = async (context: any) => {
    const { query } = context;
    const slug = query.slug;
    const style = query.style || 0;
    const size = query.size || 0;

    let product: any = null;

    try {
        await db.connectDb();
        product = await Product.findOne({ slug })
            .populate({ path: "category", model: Category })
            .populate({ path: "subCategories", model: SubCategory })
            .populate({ path: "reviews.reviewBy", model: User })
            .lean();
        await db.disconnectDb();
    } catch (error) {
        console.error("Using local data fallback for Product page.");
    }

    if (!product) {
        product = mockProducts.find((p) => p.slug === slug || p.name === slug) || mockProducts[0];
    }

    let subProduct = product.subProducts?.[style] || product.subProducts?.[0];
    if (!subProduct) {
        return {
            notFound: true,
        };
    }

    let prices = (subProduct.sizes || [])
        .map((s: any) => s.price)
        .sort((a: any, b: any) => a - b);

    function calculatePercentage(num: any) {
        if (!product.reviews || product.reviews.length === 0) return "0";
        return (
            (product.reviews.reduce((total: any, review: any) => {
                return (
                    total +
                    (review.rating == Number(num) ||
                        review.rating == Number(num) + 0.5)
                );
            }, 0) *
                100) /
            product.reviews.length
        ).toFixed(1);
    }

    let newProduct = {
        ...product,
        style,
        images: subProduct.images || [],
        sizes: subProduct.sizes || [],
        discount: subProduct.discount || 0,
        sku: subProduct.sku || "",
        colors: product.subProducts?.map((p: any) => p.color) || [],
        priceRange:
            subProduct.discount > 1
                ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(
                      2
                  )} to ${(
                      prices[prices.length - 1] -
                      prices[prices.length - 1] / subProduct.discount
                  ).toFixed(2)} `
                : `From ${prices[0] || 0} to ${prices[prices.length - 1] || 0}$`,
        price:
            subProduct.discount > 0 && subProduct.sizes?.[size]
                ? (
                      subProduct.sizes[size].price -
                      subProduct.sizes[size].price / subProduct.discount
                  ).toFixed(2)
                : subProduct.sizes?.[size]?.price || 0,
        priceBefore: subProduct.sizes?.[size]?.price || 0,
        quantity: subProduct.sizes?.[size]?.qty || 0,
        ratings: [
            {
                percentage: calculatePercentage("5"),
            },
            {
                percentage: calculatePercentage("4"),
            },
            {
                percentage: calculatePercentage("3"),
            },
            {
                percentage: calculatePercentage("2"),
            },
            {
                percentage: calculatePercentage("1"),
            },
        ],
        allSizes: (product.subProducts || [])
            .map((p: any) => p.sizes || [])
            .flat()
            .sort((a: any, b: any) => a.size - b.size)
            .filter(
                (element: any, index: any, array: any) =>
                    array.findIndex((el2: any) => el2.size === element.size) ===
                    index
            ),
    };

    return {
        props: {
            product: JSON.parse(JSON.stringify(newProduct)),
        },
    };
};


