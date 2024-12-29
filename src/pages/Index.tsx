import ShoppingList from "@/components/ShoppingList";
import FloatingCircles from "@/components/FloatingCircles";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4 md:p-8">
      <FloatingCircles />
      <div className="mx-auto max-w-2xl relative z-10">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
          Shopping List
        </h1>
        <ShoppingList />
      </div>
    </div>
  );
};

export default Index;