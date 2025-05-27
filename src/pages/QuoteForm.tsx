import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const productsData = {
  "Construction & Building Materials": [
    "Cement",
    "White Cement (J.K Company)",
    "BRC",
    "Steel rods / TMT bars",
    "Wire Mesh",
    "Wire Nails",
    "Bricks & Blocks",
    "Aggregates (sand, gravel, stone chips)",
    "Binding wire",
    "Roofing sheets",
    "Waterproofing materials (Fosroc & Dr. Fixit)",
    "Grouts & tile adhesives",
    "Wall putty",
  ],
  "Paint & Finishing": [
    "Interior & exterior paints (Plascon)",
    "Primers & undercoats (Plascon)",
    "Wall textures & decorative finishes (Plascon)",
    "Wood coatings & varnishes (Plascon)",
    "Paint brushes & rollers",
    "Sandpaper & abrasives",
    "Sealants & fillers (Plascon Skim it)",
    "Waterproofing coatings (Plascon Dumpseal)",
    "Enamels & metal paints (Plascon Super Gloss)",
    "Spray paints",
  ],
  "Tools & Equipment": [
    "Power tools (Bosch & Incho)",
    "Hand tools",
    "Measuring tools",
    "Safety equipment",
    "Ladders & scaffolding",
    "Cutting & welding tools",
    "Concrete mixers",
    "Trowels & plastering tools",
    "Toolboxes & storage solutions",
    "Electrical tools & testers",
  ],
};

const QuoteForm = () => {
  const [productRequests, setProductRequests] = useState([
    { category: "", product: "", quantity: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...productRequests];
    updated[index][field] = value;
    setProductRequests(updated);
  };

  const addProductRow = () => {
    setProductRequests([
      ...productRequests,
      { category: "", product: "", quantity: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target[0].value.trim();
    const email = e.target[1].value.trim();
    const phone = e.target[2].value.trim();

    // Message is optional now
    const messageIndex = 3 * productRequests.length + 3;
    const message = e.target[messageIndex]?.value.trim() || "";

    // Validate all product selections are complete
    const allProductsValid = productRequests.every(
      (item) => item.category && item.product && item.quantity
    );

    if (!name || !email || !phone || !allProductsValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Message is optional, so no validation error if empty
    toast.success("Quote submitted successfully!");
  };

  return (
    <>
      <div>
        {/* Header Section */}
        <section className="bg-ashoka-blue text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Get a Quote</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Get in touch with us for inquiries, quotes, or to learn more
                about our products.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* QUOTE CODE */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-ashoka-blue">
          Request a Quote
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-700">
              Select Products
            </h3>
            {productRequests.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
              >
                <div>
                  <label className="block text-sm text-gray-700">
                    Category
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={item.category}
                    onChange={(e) =>
                      handleChange(index, "category", e.target.value)
                    }
                  >
                    <option value="">Select Category</option>
                    {Object.keys(productsData).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Product</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={item.product}
                    onChange={(e) =>
                      handleChange(index, "product", e.target.value)
                    }
                    disabled={!item.category}
                  >
                    <option value="">Select Product</option>
                    {item.category &&
                      productsData[item.category].map((prod) => (
                        <option key={prod} value={prod}>
                          {prod}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    min={1}
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              className="bg-ashoka-blue text-white hover:bg-ashoka-orange"
              onClick={addProductRow}
            >
              + Add Another Product
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={4}
            ></textarea>
          </div>
          <Button
            type="submit"
            className="bg-ashoka-orange hover:bg-ashoka-blue text-white"
          >
            Submit Request
          </Button>
        </form>
      </div>
    </>
  );
};

export default QuoteForm;
