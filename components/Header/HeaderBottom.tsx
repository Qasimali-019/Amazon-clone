import {
    Bars3Icon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const HeaderBottom = ({ handleOpenMenu }: any) => {
    return ( 
        <>
        <div className="bg-amazon-blue_dark md:bg-amazon-blue_light flex items-center py-2 px-4 md:space-x-4 text-white max-md:-mt-1 max-md:pb-4">
            <div
                onClick={handleOpenMenu}
                className="hidden md:flex items-center cursor-pointer mr-2 text-lg hover:text-amazon-orange transition"
            >
                <Bars3Icon className="h-7 mr-1" />
                <span className="font-bold text-sm">All</span>
            </div>
            <div className="flex flex-grow max-md:overflow-x-scroll scrollbar-hide text-sm whitespace-nowrap">
                <ul className="flex space-x-5 font-medium">
                    <li className="hover:text-amazon-orange">
                        <Link href="/browse?sort=popular">Deals</Link>
                    </li>
                    <li className="hover:text-amazon-orange">
                        <Link href="/customer-service">Customer Service</Link>
                    </li>
                    <li className="hover:text-amazon-orange">
                        <Link href="/registry">Registry</Link>
                    </li>
                    <li className="hover:text-amazon-orange">
                        <Link href="/gift-cards">Gift Cards</Link>
                    </li>
                    <li className="hover:text-amazon-orange">
                        <Link href="/browse?category=electronics">Electronics</Link>
                    </li>
                </ul>
            </div>
            <div className="hidden md:inline text-sm hover:text-amazon-orange">
                <Link href="/browse?category=electronics">Shop deals in Electronics</Link>
            </div>
        </div>

        <div className="flex md:hidden items-center p-2 bg-amazon-blue_light text-slate-200 max-md:-mt-1">
            <MapPinIcon className="h-6 mr-1" />
            <span className="text-sm">Deliver to Germany</span>
        </div>
    </>
    );
}
 
export default HeaderBottom;