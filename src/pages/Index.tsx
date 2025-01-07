import ShoppingList from "@/components/ShoppingList";
import FloatingCircles from "@/components/FloatingCircles";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end dark:from-gray-900 dark:to-gray-800">
      <FloatingCircles />
      <div className="mx-auto max-w-7xl relative z-10">
        <ShoppingList />
      </div>
      <Footer />
    </div>
  );
};

export default Index;