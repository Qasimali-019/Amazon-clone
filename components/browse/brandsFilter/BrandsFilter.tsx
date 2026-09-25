import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Image from "next/image";

const BrandsFilter = ({ brands, brandHandler, replaceQuery }: any) => {
    const [show, setShow] = useState(true);
    return (
        <div className="w-full">
            <h3
                onClick={() => setShow((prev: any) => !prev)}
                className={`cursor-pointer my-4 flex items-center justify-between font-semibold `}
            >
                Brands
                <span>
                    {show ? (
                        <MinusIcon className="w-5 h-5" />
                    ) : (
                        <PlusIcon className="w-5 h-5" />
                    )}
                </span>
            </h3>
            {show && (
                <div className="grid grid-cols-2 gap-3">
                    {brands.map((brand: any, i: any) => {
                        const check = replaceQuery("brand", brand);
                        const brandKey = (brand || "").toLowerCase().replace(/[^a-z0-9]/g, "");
                        const knownBrands = ["adidas", "asics", "fila", "hoka", "nike", "puma", "rolex", "zara", "zella"];
                        const hasImage = knownBrands.includes(brandKey);

                        return (
                            <button
                                key={i}
                                onClick={() => brandHandler(check.result)}
                                className={`${
                                    check.active ? "border-amazon-blue_dark bg-gray-100 font-bold" : ""
                                } flex items-center justify-center rounded border bg-white py-2 px-1 hover:border-slate-500 text-xs text-gray-800`}
                            >
                                {hasImage ? (
                                    <Image
                                        src={`/assets/images/${brandKey}.png`}
                                        width={45}
                                        height={45}
                                        className="object-contain max-h-8"
                                        alt={brand}
                                    />
                                ) : (
                                    <span className="font-semibold px-2 py-1">{brand}</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

        </div>
    );
};

export default BrandsFilter;
