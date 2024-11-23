import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../../axiosConfig";
import ShopByCategoryItem from "../HomePage/ShopByCategoryItem";
import femaleCategoryImg from "../../../assets/kidsCategory.png";
import AlertComponent from "../alerts/AlertComponent";

function CategoryGrid() {
  const [mainCategoryFilter, setMainCategoryFilter] = useState<string | null>(
    null
  );
  const [categoryDetails, setCategoryDetails] =
    useState<Array<Category> | null>();
  const { mainCategory } = useParams();
  const [imageDataArray, setImageDataArray] = useState<String[]>([]);
  const [showLoader, setShowLoader] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [showCategoryAdd, setShowCategoryAdd] = useState(false);
  const [registerCategoryName, setRegisterCategoryName] = useState<string>("");
  const [registerCategoryDesc, setRegisterCategoryDesc] = useState<string>("");
  const [registerCategoryImage, setRegisterCategoryImage] =
    useState<File | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [showCategoryEdit, setShowCategoryEdit] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    setRole(getCookieByName("role"));
  }, [role]);
  function getCookieByName(name: string) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }
  useEffect(() => {
    if (mainCategory === "women") {
      setMainCategoryFilter("F");
    } else if (mainCategory === "men") {
      setMainCategoryFilter("M");
    } else if (mainCategory === "kids") {
      setMainCategoryFilter("K");
    }
  }, [mainCategory]);

  useEffect(() => {
    if (mainCategoryFilter) {
      fetchCategoriesByMainCategory();
    }
  }, [mainCategoryFilter]);

  useEffect(() => {
    if (editingCategory) {
      setRegisterCategoryName(editingCategory?.name);
      setRegisterCategoryDesc(editingCategory?.description);
    }
  }, [showCategoryEdit]);
  async function fetchCategoriesByMainCategory() {
    await axiosClient
      .get(`/product/category/all/${mainCategoryFilter}`)
      .then((res) => {
        setCategoryDetails(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  useEffect(() => {
    if (categoryDetails) {
      setShowLoader(false);
      fetchImages();
    }
  }, [categoryDetails]);

  async function fetchImages() {
    if (categoryDetails) {
      const images = await Promise.all(
        categoryDetails.map((category) =>
          axiosClient
            .get(`/product/image/${category.id}`)
            .then((res) => (res.status === 200 ? res.data.data : null))
            .catch(() => null)
        )
      );
      setImageDataArray(images.filter((img) => img !== null));
    }
  }
  async function showAlertMsg(msg: string) {
    setAlertMsg(msg);
    setShowAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  async function showAlertMsgDontReload(msg: string) {
    setAlertMsg(msg);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }
  async function updateCategory(category: Category) {
    const form: FormData = new FormData();

    console.log(registerCategoryImage);
    console.log(category);

    form.append("category", JSON.stringify(category));
    if (registerCategoryImage) {
      form.append("image", registerCategoryImage);
    }
    axiosClient
      .patch("/product/category/".concat(category.id + ""), form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          showAlertMsg("Updated");
        }
      })
      .catch((e) => {
        showAlertMsgDontReload(e.message);
      });
  }

  async function registerCategory() {
    if (mainCategoryFilter) {
      const form: FormData = new FormData();
      const newCategory: NewCategory = new NewCategory(
        registerCategoryName,
        registerCategoryDesc,
        mainCategoryFilter
      );
      if (registerCategoryImage) {
        form.append("category", JSON.stringify(newCategory));
        form.append("image", registerCategoryImage);
        axiosClient
          .post("/product/category", form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          })
          .then((res) => {
            if (res.status == 200) {
              showAlertMsg("Added");
            }
          })
          .catch((e) => {
            showAlertMsgDontReload(e.message);
          });
      }
    }
  }

  return (
    <div>
      {showAlert && (
        <div>
          <AlertComponent msg={alertMsg} />
        </div>
      )}
      {(showCategoryAdd || showCategoryEdit) && (
        <div className="position-fixed w-100 h-100 bg-white p-5 z-3 d-flex justify-content-center">
          <div style={{ width: "300px" }}>
            <div className="fs-5 fw-bold mb-4 text-black-50">
              Main Category :
              <span className="text-black">{mainCategory?.toUpperCase()}</span>
            </div>
            {showCategoryEdit && (
              <input
                type="text"
                name=""
                className="form-control"
                id="input-name"
                defaultValue={editingCategory?.name}
                onChange={(e) => {
                  setRegisterCategoryName(e.target.value);
                }}
              />
            )}
            {!showCategoryEdit && (
              <input
                type="text"
                name=""
                id="input-name"
                className="form-control"
                placeholder={"Category Name"}
                onChange={(e) => {
                  setRegisterCategoryName(e.target.value);
                }}
              />
            )}
            {showCategoryEdit && (
              <textarea
                className="form-control mt-3"
                style={{ height: "140px" }}
                name=""
                defaultValue={editingCategory?.description}
                id="input-desc"
                onChange={(e) => {
                  setRegisterCategoryDesc(e.target.value);
                }}
              />
            )}
            {!showCategoryEdit && (
              <textarea
                className="form-control mt-3"
                style={{ height: "140px" }}
                name=""
                id="input-desc"
                onChange={(e) => {
                  setRegisterCategoryDesc(e.target.value);
                }}
              />
            )}
            <input
              type="file"
              name=""
              className="mt-3 form-control"
              onChange={(e) => {
                if (e.target.files) {
                  setRegisterCategoryImage(e.target.files[0]);
                }
              }}
            />
            {registerCategoryImage && (
              <div className="justify-content-center d-flex mt-5">
                <img
                  src={URL.createObjectURL(registerCategoryImage)}
                  className="w-25"
                />
              </div>
            )}
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-success mt-5 w-100"
                onClick={() => {
                  if (
                    registerCategoryDesc == "" ||
                    registerCategoryName == ""
                  ) {
                    showAlertMsgDontReload("Fill all fileds");
                    if (registerCategoryImage == null && !showCategoryEdit) {
                      showAlertMsgDontReload("Image needed");
                    }
                  } else {
                    if (!showCategoryEdit) {
                      registerCategory();
                    } else {
                      if (editingCategory) {
                        editingCategory.name = registerCategoryName;
                        editingCategory.description = registerCategoryDesc;

                        updateCategory(editingCategory);
                      }
                    }
                  }
                }}
              >
                {showCategoryEdit && "Update"}
                {!showCategoryEdit && "Add"}
              </button>
              <button
                className="btn btn-primary mt-5 w-100"
                onClick={() => {
                  setShowCategoryAdd(false);
                  setShowCategoryEdit(false);
                }}
              >
                Close
              </button>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-danger w-50"
                onClick={() => {
                  if (editingCategory) {
                    axiosClient
                      .delete(
                        "/product/category/".concat(editingCategory?.id + ""),
                        {
                          withCredentials: true,
                        }
                      )
                      .then((res) => {
                        if (res.status === 200) {
                          showAlertMsg("Deleleted");
                        }
                      })
                      .catch((e) => {
                        if (e.status == 400) {
                          showAlertMsgDontReload(
                            "Can't delete already assigned in products"
                          );
                        }
                      });
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showLoader && (
        <div className="loader-style w-100 h-100 d-flex justify-content-center align-items-center position-absolute pb-5">
          <div
            className="spinner-grow"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only"> </span>
          </div>
        </div>
      )}
      <div className="mt-5 m-3 pt-3">
        <div className="d-flex flex-wrap justify-content-between">
          <h1 className="home-shop-by-cateogry-tittle text-start fs-4">
            {mainCategory?.toUpperCase()} Categories
          </h1>
          {role == "ADMIN" && (
            <div className="">
              <button
                className="btn btn-success"
                onClick={() => {
                  setShowCategoryAdd(true);
                }}
              >
                Add New
              </button>
            </div>
          )}
        </div>
        <div className="row mt-3 m-3 gap-sm-5 gap-5 gap-md-0">
          {categoryDetails &&
            imageDataArray.length === categoryDetails.length &&
            categoryDetails.map((category, index) => (
              <div
                key={index}
                className="col-sm-12 col-lg-6 col-md-3 col-xl-6 col-xxl-6 mb-0 mb-md-4"
              >
                <div>
                  <div className="d-flex justify-content-end">
                    <div className="position-relative ">
                      {role == "ADMIN" && (
                        <button
                          className="text-white bg-danger border-0 rounded-2 p-2 m-2"
                          onClick={() => {
                            setShowCategoryEdit(true);
                            setEditingCategory(category);
                            console.log(editingCategory?.description);
                          }}
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                  <ShopByCategoryItem
                    img={
                      imageDataArray[index]
                        ? `data:image/png;base64,${imageDataArray[index]}`
                        : femaleCategoryImg
                    }
                    name={category.name}
                    link={"/store/category/".concat(category.id + "")}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

interface Category {
  id: number;
  name: string;
  description: string;
  imageId: number;
  mainCategory: string;
}

class NewCategory {
  name: string;
  description: string;
  mainCategory: string;

  constructor(name: string, description: string, mainCategory: string) {
    this.name = name;
    this.description = description;
    this.mainCategory = mainCategory;
  }
}
export default CategoryGrid;
