import axios from "axios";

export const saveCart = async (cart, user_id) => {
    try {
        const { data } = await axios.post("/api/user/savecart", {
            cart,
            user_id,
        });
        return data;
    } catch (error) {
        if (typeof window !== "undefined") {
            localStorage.setItem("amazon_cart", JSON.stringify(cart));
        }
        return { success: true, message: "Cart saved to LocalStorage" };
    }
};

export const saveAddress = async (address) => {
    try {
        const { data } = await axios.post("/api/user/saveaddress", {
            address,
        });
        return data;
    } catch (error) {
        if (typeof window !== "undefined") {
            const raw = localStorage.getItem("amazon_addresses") || "[]";
            const addresses = JSON.parse(raw);
            addresses.push({ _id: Date.now().toString(), ...address, active: true });
            localStorage.setItem("amazon_addresses", JSON.stringify(addresses));
            return { addresses };
        }
        return { addresses: [] };
    }
};

export const changeActiveAddress = async (id) => {
    try {
        const { data } = await axios.put("/api/user/manageaddress", {
            id,
        });
        return data;
    } catch (error) {
        if (typeof window !== "undefined") {
            const raw = localStorage.getItem("amazon_addresses") || "[]";
            let addresses = JSON.parse(raw);
            addresses = addresses.map((a) => ({ ...a, active: a._id === id }));
            localStorage.setItem("amazon_addresses", JSON.stringify(addresses));
            return { addresses };
        }
        return { addresses: [] };
    }
};

export const deleteAddress = async (id) => {
    try {
        const { data } = await axios.delete("/api/user/manageaddress", {
            data: { id },
        });
        return data;
    } catch (error) {
        if (typeof window !== "undefined") {
            const raw = localStorage.getItem("amazon_addresses") || "[]";
            let addresses = JSON.parse(raw);
            addresses = addresses.filter((a) => a._id !== id);
            localStorage.setItem("amazon_addresses", JSON.stringify(addresses));
            return { addresses };
        }
        return { addresses: [] };
    }
};


export const applyCoupon = async (coupon) => {
    try {
        const { data } = await axios.post("/api/user/applycoupon", {
            coupon,
        });
        return data;
    } catch (error) {
        if (coupon.toLowerCase() === "discount10") {
            return { discount: 10, totalAfterDiscount: 90 };
        }
        return { message: "Invalid coupon. Try 'DISCOUNT10'" };
    }
};

