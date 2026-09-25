import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import MenuSideBar from "@/components/Header/MenuSidebar";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Registry() {
  const [registries, setRegistries] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Wedding");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("amazon_registries");
      if (raw) {
        setRegistries(JSON.parse(raw));
      } else {
        const initial = [
          { id: "reg_1", name: "Sarah & Alex Wedding Registry", type: "Wedding", items: 12 },
          { id: "reg_2", name: "Emma's Baby Shower Registry", type: "Baby", items: 8 },
        ];
        localStorage.setItem("amazon_registries", JSON.stringify(initial));
        setRegistries(initial);
      }
    }
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newReg = {
      id: "reg_" + Date.now(),
      name,
      type,
      items: 0,
    };

    const updated = [...registries, newReg];
    setRegistries(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("amazon_registries", JSON.stringify(updated));
    }
    setName("");
  };

  return (
    <>
      <Header title="Gift Registry - Full Amazon Clone" />
      <main className="max-w-screen-xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
        <div className="bg-amazon-blue_dark text-white p-8 rounded-xl mb-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Amazon Gift Registry</h1>
            <p className="text-gray-300">Create a wedding, baby, or custom registry and share it with friends and family.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="bg-amazon-orange text-gray-900 font-bold px-6 py-3 rounded-lg text-sm inline-block">
              Saved to LocalStorage
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Registry Form */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Create a New Registry</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Registry Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John & Mary Wedding 2026"
                  className="w-full border px-4 py-2 rounded text-sm focus:ring-2 focus:ring-amazon-orange focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Registry Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border px-4 py-2 rounded text-sm focus:ring-2 focus:ring-amazon-orange focus:outline-none"
                >
                  <option value="Wedding">Wedding Registry</option>
                  <option value="Baby">Baby Registry</option>
                  <option value="Birthday">Birthday & Gift List</option>
                </select>
              </div>

              <button
                type="submit"
                className="button-orange w-full py-2.5 font-bold text-gray-900 text-sm rounded"
              >
                Create Registry
              </button>
            </form>
          </div>

          {/* List Registries */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Your Active Registries</h2>
            <div className="space-y-4">
              {registries.map((reg) => (
                <div key={reg.id} className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <h3 className="font-bold text-gray-900">{reg.name}</h3>
                    <p className="text-xs text-gray-500">Type: {reg.type} &bull; {reg.items} items added</p>
                  </div>
                  <span className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer">
                    Manage Registry &rarr;
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MenuSideBar />
    </>
  );
}
