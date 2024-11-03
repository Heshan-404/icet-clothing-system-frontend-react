 
import FooterComponent from "../../components/Footer/FooterComponent";
import FirstHeroSection from "../../components/HomePage/FirstHeroSection";
import ShopByCategory from "../../components/HomePage/ShopByCategory";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

function HomePage() {
  return (
    <div>
      <NavigationBar />
      <FirstHeroSection />
      <ShopByCategory />    
      <FooterComponent/>
    </div>
  );
}

export default HomePage;
