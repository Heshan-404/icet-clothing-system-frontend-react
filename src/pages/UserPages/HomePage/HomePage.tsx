import FooterComponent from "../../../components/UserPages/Footer/FooterComponent";
import FirstHeroSection from "../../../components/UserPages/HomePage/FirstHeroSection";
import ShopByCategory from "../../../components/UserPages/HomePage/ShopByCategory";
import NavigationBar from "../../../components/UserPages/NavigationBar/NavigationBar";

function HomePage() {
  return (
    <div>
      <NavigationBar />
      <FirstHeroSection />
      <ShopByCategory />
      <FooterComponent />
    </div>
  );
}

export default HomePage;
