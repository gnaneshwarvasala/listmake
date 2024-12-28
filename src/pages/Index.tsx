import { ShoppingList } from "@/components/ShoppingList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
          Shopping List
        </h1>
        <ShoppingList />
      </div>
    </div>
  );
};

export default Index;