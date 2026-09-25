import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import MenuSideBar from "@/components/Header/MenuSidebar";
import { useState } from "react";
import Image from "next/image";

export default function GiftCards() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("Happy Birthday!");
  const [purchased, setPurchased] = useState(false);

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) return;

    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("amazon_gift_cards") || "[]";
      const cards = JSON.parse(raw);
      cards.push({
        id: "gc_" + Date.now(),
        amount: selectedAmount,
        recipient,
        message,
        date: new Date().toLocaleDateString(),
      });
      localStorage.setItem("amazon_gift_cards", JSON.stringify(cards));
    }

    setPurchased(true);
    setTimeout(() => {
      setPurchased(false);
      setRecipient("");
    }, 4000);
  };

  return (
    <>
      <Header title="Amazon eGift Cards" />
      <main className="max-w-screen-xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Amazon eGift Cards</h1>
        <p className="text-gray-600 mb-6">Send digital Amazon gift cards instantly via email.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Preview */}
          <div className="bg-gradient-to-r from-amazon-blue_dark to-amazon-blue_light text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between h-64 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="font-bold text-2xl tracking-wide">amazon.com</span>
              <span className="bg-yellow-400 text-gray-900 font-extrabold px-4 py-1 rounded-full text-lg">
                ${selectedAmount}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-300 uppercase tracking-wider">eGift Card</p>
              <p className="text-lg font-semibold italic truncate">{message || "A gift for you!"}</p>
            </div>
            <div className="text-xs text-slate-400 flex justify-between">
              <span>To: {recipient || "Recipient Name"}</span>
              <span>LocalStorage Redeemable</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Customize eGift Card</h2>
            <form onSubmit={handlePurchase} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Select Amount</label>
                <div className="flex gap-3">
                  {[25, 50, 100, 200].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedAmount(amt)}
                      className={`flex-1 py-2 rounded border text-sm font-bold transition ${
                        selectedAmount === amt
                          ? "bg-amazon-orange text-gray-900 border-amazon-orange"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Recipient Email</label>
                <input
                  type="email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="friend@example.com"
                  className="w-full border px-4 py-2 rounded text-sm focus:ring-2 focus:ring-amazon-orange focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Gift Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className="w-full border px-4 py-2 rounded text-sm focus:ring-2 focus:ring-amazon-orange focus:outline-none"
                ></textarea>
              </div>

              {purchased && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-sm font-semibold">
                  Gift Card saved to LocalStorage and emailed to {recipient}!
                </div>
              )}

              <button
                type="submit"
                className="button-orange w-full py-3 font-bold text-gray-900 text-sm rounded-lg"
              >
                Buy eGift Card Now
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <MenuSideBar />
    </>
  );
}
