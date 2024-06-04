import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import ImageUpload from "../Components/ImageUpload";
import SingleSelector from "../Components/SingleSelector";
import { useDispatch } from "react-redux";
import { getAllProductsData, getMobileHomeData, mobileHomeData, webHomeData } from "../../../slices/HomeApi/thunk";
import { useSelector } from "react-redux";
import MultiSelectorProduct from "../Components/MultiSelectorProduct";
import { ToastContainer, toast } from "react-toastify";
import { resetHomeData } from "../../../slices/HomeApi/reducer";
import MultiSelector from "../Components/MultiSelector";
import { getGetCategoriesData } from "../../../slices/categories/thunk";

function MobileHome() {
  const [topSlider, setTopSlider] = useState([{ link: '' }, { link: '' }, { link: '' }]);
  const [topBanner, setTopBanner] = useState([{ link: '' }, { link: '' }, { link: '' }]);
  const [secondBanner, setSecondBanner] = useState([{ link: '' }, { link: '' }, { link: '' }]);
  const [SingleSelectedCategory, setSingleSelectedCategory] = useState({});
  const [categoriesData, setCategoriesData] = useState([]);
  const [sections, setSections] = useState([]);

  const dispatch = useDispatch();

  const HomeDataRes = useSelector((state) => state.HomeSlice.getMobileData);
  const PostMobileHomeData = useSelector((state) => state.HomeSlice.mobileHomeApiData);

  useEffect(() => {
    fetchHomeData();
    fetchProduct();
    return () => {
      dispatch(resetHomeData());
    }
  }, [])

  useEffect(() => {
    if (HomeDataRes && HomeDataRes.success && HomeDataRes.homeMobileData.length > 0) {
      let data = HomeDataRes.homeMobileData[0];

      setTopSlider((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(data.top_slider)) {
          return data.top_slider;
        }
        return prev;
      });
      setTopBanner((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(data.top_banner)) {
          return data.top_banner;
        }
        return prev;
      });
      setSecondBanner((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(data.second_banner)) {
          return data.second_banner;
        }
        return prev;
      });
      setSections((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(data.top_products)) {
          return data.top_products;
        }
        return prev;
      });
      setCategoriesData((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(data.categories_slider)) {
          return data.categories_slider;
        }
        return prev;
      });
    }
  }, [HomeDataRes]);

  useEffect(() => {
    if (PostMobileHomeData && PostMobileHomeData.success) {
      bottomrightnotify("Mobile Home Page updated successfully");

    }
  }, [PostMobileHomeData])

  const fetchHomeData = () => {
    dispatch(getMobileHomeData());
    dispatch(getGetCategoriesData());
  }

  const fetchProduct = () => {
    dispatch(getAllProductsData());
  }

  const handleAddSection = () => {
    const newSection = {
      section_name: "",
      url: "",
      products: [],
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (indexToRemove) => {
    setSections(sections.filter((_, index) => index !== indexToRemove));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;

    const updatedSections = [...sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [name]: value,
    };

    setSections(updatedSections);
  };

  const handleSelectedProduct = (data, index) => {
    const updatedSections = [...sections];
    updatedSections[index] = {
      ...updatedSections[index],
      data: data,
    };
    setSections(updatedSections);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setLoading(true);
    try {
      const formattedTopSlider = topSlider?.map((item) => ({
        categories_id: item?.categories_id,
        media_id: item.image || item?.media_id?._id,
      }));
      const formattedTopBanner = topBanner?.map((item) => ({
        categories_id: item?.categories_id,
        media_id: item.image || item?.media_id?._id,
      }));
      const formattedSecondBanner = secondBanner?.map((item) => ({
        categories_id: item?.categories_id,
        media_id: item.image || item?.media_id?._id,
      }));
      const formattedTopProducts = sections?.map((item) => ({
        section_name: item?.section_name,
        products: item?.products?.map((product) => product?._id),
        url: item?.url,
      }));

      let params = {
        top_slider: formattedTopSlider,
        top_banner: formattedTopBanner,
        categories_slider: categoriesData.map(val => (val._id)),
        second_banner: formattedSecondBanner,
        top_products: formattedTopProducts,
      }
      dispatch(mobileHomeData(params));
    } catch (error) {
      // toast.error(error.response.data.message);
    }
  };

  const handleImageUpload = (media_id, index, type) => {
    if (type === "topSlider") {
      const updatedTopSlider = topSlider.map((item, idx) =>
        idx === index ? { ...item, image: media_id } : item
      );
      setTopSlider(updatedTopSlider);
    } else if (type === "topBanner") {
      const updatedTopBanner = topBanner.map((item, idx) =>
        idx === index ? { ...item, image: media_id } : item
      );
      setTopBanner(updatedTopBanner);
    } else if (type === "secondBanner") {
      const updatedTopBanner = secondBanner.map((item, idx) =>
        idx === index ? { ...item, image: media_id } : item
      );
      setSecondBanner(updatedTopBanner);
    }
  };

  const handleTopCategories = useCallback((data) => {
    setCategoriesData(data)
  }, [])

  const handleCategoriesLinks = (id, index, type) => {
    if (type === "topSlider") {
      const updatedTopSlider = topSlider.map((item, idx) =>
        idx === index ? { ...item, categories_id: id.value } : item
      );
      setTopSlider(updatedTopSlider);
    } else if (type === "topBanner") {
      const updatedTopBanner = topBanner.map((item, idx) =>
        idx === index ? { ...item, categories_id: id.value } : item
      );
      setTopBanner(updatedTopBanner);
    } else if (type === "secondBanner") {
      const updatedTopBanner = secondBanner.map((item, idx) =>
        idx === index ? { ...item, categories_id: id.value } : item
      );
      setSecondBanner(updatedTopBanner);
    }

  }

  const bottomrightnotify = (message) => toast(message, { position: "bottom-right", hideProgressBar: true, className: 'bg-success text-white' });

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
        {/* top Section */}
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Top Section</h4>
            <Button color="danger">Clear</Button>
          </CardHeader>
          <CardBody>
            <div className="d-flex gap-3 justify-content-between">
              <div className="w-30">
                <ImageUpload imageUrl={topSlider[0]?.media_id?.url} size={"1000x562"} handleImageUpload={handleImageUpload}
                  index={0} name="topSlider" />
                <div className="mt-1">
                  <SingleSelector name="topSlider" index={0} handleSelectedFnc={handleCategoriesLinks} selectedData={SingleSelectedCategory} placeholder={"Select Categories"} />
                </div>
              </div>
              <div className="w-30">
                <ImageUpload imageUrl={topSlider[1]?.media_id?.url} size={"1000x562"} handleImageUpload={handleImageUpload}
                  index={0} name="topSlider" />
                <div className="mt-1">
                  <SingleSelector name="topSlider" index={1} handleSelectedFnc={handleCategoriesLinks} selectedData={SingleSelectedCategory} placeholder={"Select Categories"} />
                </div>
              </div>
              <div className="w-30">
                <ImageUpload imageUrl={topSlider[2]?.media_id?.url} size={"1000x562"} handleImageUpload={handleImageUpload}
                  index={0} name="topSlider" />
                <div className="mt-1">
                  <SingleSelector name="topSlider" index={2} handleSelectedFnc={handleCategoriesLinks} selectedData={SingleSelectedCategory} placeholder={"Select Categories"} />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Top Banner Section</h4>
            <Button color="danger">Clear</Button>
          </CardHeader>
          <CardBody>
            <div className="d-flex gap-3 justify-content-between">
              <div className="w-30">
                <ImageUpload imageUrl={topBanner[0]?.media_id?.url} size={"1460x576"}
                  handleImageUpload={handleImageUpload}
                  index={0} name="topBanner" />
                <div className="mt-1">
                  <SingleSelector name="topBanner" index={0} handleSelectedFnc={handleCategoriesLinks} selectedData={SingleSelectedCategory} placeholder={"Select Categories"} />

                </div>
              </div>
              <div className="w-30">
                <ImageUpload imageUrl={topBanner[1]?.media_id?.url} size={"1460x576"}
                  handleImageUpload={handleImageUpload}
                  index={0} name="topBanner" />
                <div className="mt-1">
                  <SingleSelector name="topBanner" index={1} handleSelectedFnc={handleCategoriesLinks} selectedData={SingleSelectedCategory} placeholder={"Select Categories"} />

                </div>
              </div>
              <div className="w-30">
                <ImageUpload imageUrl={topBanner[2]?.media_id?.url} size={"1460x576"}
                  handleImageUpload={handleImageUpload}
                  index={0} name="topBanner" />
                <div className="mt-1">
                  <SingleSelector name="topBanner" index={2} handleSelectedFnc={handleCategoriesLinks} selectedData={SingleSelectedCategory} placeholder={"Select Categories"} />

                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Second Banner Section</h4>
            <Button color="danger">Clear</Button>
          </CardHeader>
          <CardBody>
            <div className="d-flex gap-3 justify-content-between">
              <div className="w-30">
                <ImageUpload imageUrl={secondBanner[0]?.media_id?.url} size={"1460x576"}
                  handleImageUpload={handleImageUpload}
                  index={0} name="secondBanner" />

                <div className="mt-1">
                  <SingleSelector name="secondBanner" index={0} handleSelectedFnc={handleCategoriesLinks} selectedData={SingleSelectedCategory} placeholder={"Select Categories"} />

                </div>
              </div>
              <div className="w-30">
                <ImageUpload imageUrl={secondBanner[0]?.media_id?.url} size={"1460x576"}
                  handleImageUpload={handleImageUpload}
                  index={0} name="secondBanner" />

                <div className="mt-1">
                  <SingleSelector name="secondBanner" index={1} handleSelectedFnc={handleCategoriesLinks} selectedData={SingleSelectedCategory} placeholder={"Select Categories"} />

                </div>
              </div>
              <div className="w-30">
                <ImageUpload imageUrl={secondBanner[0]?.media_id?.url} size={"1460x576"}
                  handleImageUpload={handleImageUpload}
                  index={0} name="secondBanner" />

                <div className="mt-1">
                  <SingleSelector name="secondBanner" index={2} handleSelectedFnc={handleCategoriesLinks} selectedData={SingleSelectedCategory} placeholder={"Select Categories"} />

                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="border-0 align-items-center">
            <h4 className="card-title mb-0 flex-grow-1">
              Categories Slider Section
            </h4>
          </CardHeader>
          <CardBody>
            <div className="">
              <MultiSelector handleSelectedFnc={handleTopCategories} selectedData={categoriesData} placeholder={"Select Categories"} />
            </div>
          </CardBody>
        </Card>

        {/* Offer Section */}
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Offer Section</h4>
            <Button onClick={handleAddSection} color="primary">
              Add Section
            </Button>
          </CardHeader>
          <CardBody>
            {sections?.map((section, index) => (
              <div key={index} className="mb-3">
                <div className="d-flex justify-content-between">
                  <div></div>
                  <i
                    onClick={() => handleRemoveSection(index)}
                    className="bx bx-trash text-danger mb-1 fs-3 cursor-pointer "
                  ></i>
                </div>
                <MultiSelectorProduct index={index} handleSelectedFnc={handleSelectedProduct} selectedProducts={section.products} placeholder={"Select Products"} />
                <Row>
                  <Col>
                    <div className="mt-3 w-full">
                      <Input
                        type="text"
                        className="form-control"
                        id="placeholderInput1"
                        placeholder="Section Name"
                        name="section_name"
                        value={section.section_name}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="mt-3 w-full">
                      <Input
                        type="text"
                        className="form-control"
                        id="placeholderInput2"
                        placeholder="View All URL"
                        name="url"
                        value={section.url}
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </CardBody>
        </Card>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
}

export default MobileHome;
