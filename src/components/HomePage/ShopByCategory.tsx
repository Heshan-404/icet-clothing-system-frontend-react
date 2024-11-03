import ShopByCategoryItem from "./ShopByCategoryItem";
import femaleCategoryImg from "../../assets/femaleCategory.png";
import maleCategoryImg from "../../assets/maleCategory.png";
import kidsCategoryImg from "../../assets/kidsCategory.png";
function ShopByCategory() {
  return (
    <div className="m-5 ">
      <div className="row">
        <h1 className="home-shop-by-cateogry-tittle">SHOP BY CATEGORY</h1>
      </div>
      <div className="row mt-3 gap-sm-5 gap-5 gap-md-0">
        <div
          className="col-sm-12 col-lg-6 col-md-6 col-xl-6 col-xxl-6"
          data-aos="fade-right"
          data-aos-easing="ease-in-back"
          data-aos-delay="500"
          data-aos-offset="0"
        >
          <ShopByCategoryItem img={femaleCategoryImg} name={"WOMEN"} />
        </div>
        <div
          className="col-sm-12 col-lg-6 col-md-6 col-xl-6 col-xxl-6"
          data-aos="fade-left"
          data-aos-easing="ease-in-back"
          data-aos-delay="1000"
          data-aos-offset="0"
        >
          <ShopByCategoryItem img={maleCategoryImg} name={"MEN"} />
        </div>
        <div
          className="col-12"
          data-aos="fade-left"
          data-aos-easing="ease-in-back"
          data-aos-delay="1000"
          data-aos-offset="0"
        >
          <ShopByCategoryItem
            img={kidsCategoryImg}
            name={"KIDS"}   
          />
        </div>
      </div>
    </div>
  );
}

export default ShopByCategory;
