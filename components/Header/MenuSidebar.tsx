import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeMenu, selectMenu } from "@/redux/slices/MenuSlice";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/localAuth";
import Link from "next/link";
import { useRouter } from "next/router";

const MenuSideBar = () => {
    const dispatch = useAppDispatch();
    const menu = useAppSelector(selectMenu);
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        setUser(getCurrentUser());
    }, [router.pathname, menu]);

    const navigateTo = (path: string) => {
        dispatch(closeMenu());
        router.push(path);
    };

    return (
        <>
            <div
                className={`flex flex-col fixed bg-white shadow-xl w-72 md:w-96 h-screen top-0 z-50 
               ${menu ? "block" : "hidden"}
            `}
            >
                <div className="relative h-full">
                    <div
                        className="absolute top-3 cursor-pointer -right-12 hover:scale-110 transition"
                        onClick={() => dispatch(closeMenu())}
                    >
                        <XMarkIcon className="h-9 text-white drop-shadow-md" />
                    </div>

                    <div className="flex items-center bg-amazon-blue_light text-white px-8 py-3">
                        <UserCircleIcon className="h-9" />
                        <b className="text-xl font-bold ml-3">
                            {user ? (
                                <Link href="/profile" onClick={() => dispatch(closeMenu())}>
                                    Hello, {user.name}
                                </Link>
                            ) : (
                                <Link href="/auth/signin" onClick={() => dispatch(closeMenu())}>
                                    Hello, sign in
                                </Link>
                            )}
                        </b>
                    </div>

                    <div className="menu-sidebar flex flex-col py-2 overflow-y-scroll h-[85%]">
                        <h3>Digital Content & Devices</h3>
                        <ul className="border-b pb-2 cursor-pointer">
                            <li className="group" onClick={() => navigateTo("/browse?search=music")}>
                                Amazon Music
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group" onClick={() => navigateTo("/browse?search=apps")}>
                                Amazon Appstore
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                        </ul>

                        <h3>Shop By Department</h3>
                        <ul className="border-b pb-2 cursor-pointer">
                            <li className="group" onClick={() => navigateTo("/browse")}>
                                Women&apos;s Clothing &amp; Shoes
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>

                            <li className="group flex" onClick={() => navigateTo("/browse?category=electronics")}>
                                Electronics & Computers
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group" onClick={() => navigateTo("/browse?search=smart")}>
                                Smart Home
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group" onClick={() => navigateTo("/browse")}>
                                Arts & Crafts
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                        </ul>

                        <h3>Programs & Features</h3>
                        <ul className="border-b pb-2 cursor-pointer">
                            <li className="group" onClick={() => navigateTo("/gift-cards")}>
                                Gift Cards
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group" onClick={() => navigateTo("/registry")}>
                                Gift Registry
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                            <li className="group" onClick={() => navigateTo("/customer-service")}>
                                Customer Service
                                <ChevronRightIcon className="group-hover:text-gray-800" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {menu && (
                <div
                    onClick={() => dispatch(closeMenu())}
                    className="fixed bg-zinc-900/[0.85] w-full h-screen z-40 top-0 right-0"
                ></div>
            )}
        </>
    );
};

export default MenuSideBar;


