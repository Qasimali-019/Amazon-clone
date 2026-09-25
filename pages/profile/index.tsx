import Layout from "@/components/profile/layout/Layout";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/utils/localAuth";

const Profile = ({ user: serverUser, tab }: any) => {
    const [user, setUser] = useState(serverUser || { name: "Demo User", email: "demo@amazon.com", image: "/assets/images/user-image-default.jpg" });

    useEffect(() => {
        const local = getCurrentUser();
        if (local) {
            setUser(local);
        }
    }, []);

    return (
        <>
            <Layout user={user} tab={tab} title={`${user?.name || "User"}'s Profile`}>
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-6">My Profile</h2>
                    <p className="text-gray-600">Welcome, {user?.name}!</p>
                </div>
            </Layout>
        </>
    );
};

export default Profile;

export async function getServerSideProps(context: any) {
    const { query } = context;
    try {
        await db.connectDb();
        const session = await getSession(context);
        await db.disconnectDb();
        if (session) {
            return {
                props: {
                    user: session.user,
                    tab: query.tab || 0,
                },
            };
        }
    } catch (e) {
        // Fallback for frontend-only auth
    }

    return {
        props: {
            user: { name: "Demo User", email: "demo@amazon.com", image: "/assets/images/user-image-default.jpg" },
            tab: query.tab || 0,
        },
    };
}

