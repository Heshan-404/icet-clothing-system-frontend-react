import FooterComponent from "../../../components/UserPages/Footer/FooterComponent";
import CategoryGrid from "../../../components/UserPages/MainCategoryPage/CateogryGrid";
import NavigationBar from "../../../components/UserPages/NavigationBar/NavigationBar";

function MainCategoryPage() {
  return (
    <div>
      <NavigationBar />
      
      <CategoryGrid />
      <FooterComponent />
    </div>
  );
}

export default MainCategoryPage;
