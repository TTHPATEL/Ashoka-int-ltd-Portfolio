
import { useState } from "react";
import { Download, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Product data - this would typically come from an API or database
const productCategories = [
  {
    id: "construction",
    name: "Construction & Building Materials",
    products: [
      { id: 1, name: "Steel Bars", description: "High-quality steel bars for construction." },
      { id: 2, name: "Cutting Discs", description: "Durable cutting discs for various materials." },
      { id: 3, name: "Welding Rods", description: "Professional welding rods for strong joints." },
      { id: 4, name: "Power Tools", description: "Reliable power tools for construction work." },
      { id: 5, name: "BRC Mesh", description: "Standard BRC mesh for reinforcement." },
      { id: 6, name: "Wire Nails", description: "Various sizes of wire nails available." },
      { id: 7, name: "Binding Wire", description: "Galvanized binding wire for construction use." },
      { id: 8, name: "Construction Adhesives", description: "Strong adhesives for building materials." },
    ]
  },
  {
    id: "paint",
    name: "Paint & Finishing",
    products: [
      { id: 9, name: "Plascon Paint", description: "Premium quality Plascon paints in various colors." },
      { id: 10, name: "Paint Brushes", description: "Professional paint brushes for smooth application." },
      { id: 11, name: "Cement", description: "High-grade cement for construction projects." },
      { id: 12, name: "Wall Putty", description: "Smooth wall putty for perfect finishing." },
      { id: 13, name: "Waterproofing Materials", description: "Effective waterproofing solutions." },
      { id: 14, name: "Paint Rollers", description: "Quality paint rollers for even application." },
      { id: 15, name: "Sandpaper", description: "Various grades of sandpaper for surface preparation." },
      { id: 16, name: "Varnish", description: "Protective varnish for wood surfaces." },
    ]
  },
  {
    id: "tools",
    name: "Tools & Equipment",
    products: [
      { id: 17, name: "Hand Tools", description: "Essential hand tools for various tasks." },
      { id: 18, name: "Measuring Tools", description: "Precision measuring instruments." },
      { id: 19, name: "Electrical Tools", description: "Specialized tools for electrical work." },
      { id: 20, name: "Safety Equipment", description: "Essential safety gear for construction work." },
      { id: 21, name: "Ladders", description: "Sturdy ladders in various sizes." },
      { id: 22, name: "Plumbing Tools", description: "Specialized tools for plumbing work." },
      { id: 23, name: "Gardening Tools", description: "Quality tools for gardening and landscaping." },
      { id: 24, name: "Tool Storage", description: "Organized storage solutions for tools." },
    ]
  }
];

const Products = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search term
  const filteredProducts = productCategories.flatMap(category => 
    category.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      {/* Header Section */}
      <section className="bg-ashoka-blue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore our wide range of quality hardware and construction materials.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="flex items-center bg-ashoka-gray hover:bg-ashoka-dark">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button className="flex items-center bg-ashoka-orange hover:bg-ashoka-blue">
              <Download className="mr-2 h-4 w-4" />
              Download Catalog
            </Button>
          </div>

          {/* Product Tabs */}
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-8 flex flex-wrap gap-2">
              <TabsTrigger value="all">All Products</TabsTrigger>
              {productCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* All Products Tab */}
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            {/* Category Tabs */}
            {productCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.products
                    .filter(product => 
                      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      product.description.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-ashoka-lightgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-ashoka-dark mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-ashoka-gray max-w-2xl mx-auto mb-8">
              We have a much wider range of products than what's shown here. Contact us for specific requirements or to check availability.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-ashoka-blue hover:bg-ashoka-dark text-white"
                asChild
              >
                <a href="/contact">
                  Contact Us
                </a>
              </Button>
              <Button 
                variant="outline"
                className="border-ashoka-blue text-ashoka-blue hover:bg-ashoka-blue hover:text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Full Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }: { product: { id: number, name: string, description: string } }) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-200"></div>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-ashoka-dark mb-2">{product.name}</h3>
        <p className="text-ashoka-gray mb-4">{product.description}</p>
        <Button 
          variant="outline" 
          className="w-full border-ashoka-blue text-ashoka-blue hover:bg-ashoka-blue hover:text-white"
        >
          Enquire Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default Products;
