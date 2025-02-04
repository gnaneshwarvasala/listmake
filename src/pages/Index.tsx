import ShoppingList from "@/components/ShoppingList";
import FloatingCircles from "@/components/FloatingCircles";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end dark:from-gray-900 dark:to-gray-800">
      <FloatingCircles />
      <Header />
      
      {/* Top Ad Space */}
      <div className="w-full max-w-[728px] h-[90px] mx-auto mb-4 hidden md:block">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
             data-ad-slot="YOUR_AD_SLOT_ID"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
      
      {/* Mobile Top Ad Space */}
      <div className="w-full max-w-[320px] h-[100px] mx-auto mb-4 md:hidden">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
             data-ad-slot="YOUR_MOBILE_AD_SLOT_ID"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
      
      <div className="mx-auto max-w-7xl relative z-10">
        <ShoppingList />
      </div>
      
      {/* Bottom Ad Space */}
      <div className="w-full max-w-[728px] h-[90px] mx-auto mt-4 hidden md:block">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
             data-ad-slot="YOUR_BOTTOM_AD_SLOT_ID"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
      
      {/* Mobile Bottom Ad Space */}
      <div className="w-full max-w-[320px] h-[100px] mx-auto mt-4 md:hidden">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
             data-ad-slot="YOUR_MOBILE_BOTTOM_AD_SLOT_ID"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;