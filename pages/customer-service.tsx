import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import MenuSideBar from "@/components/Header/MenuSidebar";
import Link from "next/link";
import { useState } from "react";

export default function CustomerService() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "system", text: "Hello! Welcome to Amazon Customer Support. How can we help you today?" },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setQuery("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "system",
          text: `Thank you for reaching out regarding "${userText}". Your issue has been logged in LocalStorage support tickets!`,
        },
      ]);
    }, 600);
  };

  return (
    <>
      <Header title="Customer Service - Full Amazon Clone" />
      <main className="max-w-screen-xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Amazon Customer Service</h1>
        <p className="text-gray-600 mb-6">How can we help you with your order or account today?</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2 text-amazon-blue_dark">Your Orders</h3>
            <p className="text-sm text-gray-600 mb-4">Track packages, edit or cancel orders, or return items.</p>
            <Link href="/profile/orders" className="text-sm text-blue-600 hover:underline font-semibold">
              Go to Your Orders &rarr;
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2 text-amazon-blue_dark">Returns & Refunds</h3>
            <p className="text-sm text-gray-600 mb-4">Return items, track return status, or view refund details.</p>
            <Link href="/profile" className="text-sm text-blue-600 hover:underline font-semibold">
              Manage Returns &rarr;
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2 text-amazon-blue_dark">Account Settings</h3>
            <p className="text-sm text-gray-600 mb-4">Update login details, manage saved payment methods & addresses.</p>
            <Link href="/profile/security" className="text-sm text-blue-600 hover:underline font-semibold">
              Account Security &rarr;
            </Link>
          </div>
        </div>

        {/* Live Support Assistant */}
        <div className="bg-white p-6 rounded-lg border shadow-sm max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Live Support Assistant (LocalStorage Enabled)</h2>
          <div className="h-64 overflow-y-auto border p-4 rounded bg-gray-50 mb-4 space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg text-sm max-w-md ${
                    m.sender === "user"
                      ? "bg-amazon-blue_light text-white"
                      : "bg-white border text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question or describe your issue..."
              className="flex-grow border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amazon-orange text-sm"
            />
            <button
              type="submit"
              className="button-orange px-6 py-2 text-sm font-semibold text-gray-900"
            >
              Send
            </button>
          </form>
        </div>
      </main>
      <Footer />
      <MenuSideBar />
    </>
  );
}
