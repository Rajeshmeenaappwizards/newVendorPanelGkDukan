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
import MultiSelector from "../Components/MultiSelector";
import { useDispatch } from "react-redux";
import { getAllProductsData, getWebHomeData, getheaderCategoriesData, headerCategoriesData, webHomeData } from "../../../slices/HomeApi/thunk";
import { useSelector } from "react-redux";
import MultiSelectorProduct from "../Components/MultiSelectorProduct";
import { ToastContainer, toast } from "react-toastify";
import { resetHeaderCategories, resetHomeData } from "../../../slices/HomeApi/reducer";
import { getGetCategoriesData } from "../../../slices/categories/thunk";

const Home = () => {
  const [topSlider, setTopSlider] = useState([{ link: '' }, { link: '' }, { link: '' }]);
  const [topBanner, setTopBanner] = useState([{ link: '' }, { link: '' }, { link: '' }]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [findItFast, setFindItFast] = useState([]);
  const [sections, setSections] = useState([]);
  const [headerCategory, setHeaderCategory] = useState([]);

  const dispatch = useDispatch();

  const HomeDataRes = useSelector((state) => state.HomeSlice.getWebData);
  const HeaderCategoriesRes = useSelector((state) => state.HomeSlice.getheaderCategories);
  const PostHeaderCategoriesRes = useSelector((state) => state.HomeSlice.headerCategories);
  const PostWebHomeApiRes = useSelector((state) => state.HomeSlice.webHomeApiData);

  useEffect(() => {
    fetchHomeData();
    fetchProduct();
    return () => {
      dispatch(resetHomeData());
      dispatch(resetHeaderCategories());
    }
  }, [])

  useEffect(() => {
    if (HomeDataRes && HomeDataRes.length > 0) {
      let data = HomeDataRes[0];
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
      setFindItFast((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(data.find_fast)) {
          return data.find_fast;
        }
        return prev;
      });
    }
  }, [HomeDataRes]);

  useEffect(() => {
    if (HeaderCategoriesRes && HeaderCategoriesRes.length > 0) {
      setHeaderCategory(HeaderCategoriesRes);
    }
  }, [HeaderCategoriesRes])

  useEffect(() => {
    if (PostHeaderCategoriesRes && PostHeaderCategoriesRes.success) {
      bottomrightnotify("Headers updated successfully");
    }
  }, [PostHeaderCategoriesRes])

  useEffect(() => {
    if (PostWebHomeApiRes && PostWebHomeApiRes._id) {
      bottomrightnotify("Web Home Page updated successfully");

    }
  }, [PostWebHomeApiRes])

  const fetchHomeData = () => {
    dispatch(getWebHomeData());
    dispatch(getheaderCategoriesData());
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

  const handleTopSliderInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTopSlider = topSlider.map((item, idx) =>
      idx === index ? { ...item, [name]: value } : item
    );
    setTopSlider(updatedTopSlider);
  };

  const handleTopBannerInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTopBanner = topBanner.map((item, idx) =>
      idx === index ? { ...item, [name]: value } : item
    );
    setTopBanner(updatedTopBanner);
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
    try {
      const formattedTopSlider = topSlider?.map((item, index) => ({
        title: item?.title,
        link: item?.link,
        media_id: item.image || item?.media_id?._id,
      }));
      const formattedTopBanner = topBanner?.map((item, index) => ({
        title: item?.title,
        link: item?.link,
        media_id: item.image || item?.media_id?._id,
      }));

      const formattedTopProducts = sections?.map((item, index) => ({
        section_name: item?.section_name,
        products: item?.products?.map((product) => product?._id),
        url: item?.url,
      }));

      let params = {
        top_slider: formattedTopSlider,
        top_banner: formattedTopBanner,
        categories_slider: categoriesData.map(val => (val._id || val.value)),
        top_products: formattedTopProducts,
        find_fast: findItFast.map(val => (val._id || val.value))
      }
      dispatch(webHomeData(params));
    } catch (error) {
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
    }
  };

  const handleHeaderCategory = useCallback((data) => {
    setHeaderCategory(data);
  }, [])

  const handleTopCategories = useCallback((data) => {
    setCategoriesData(data)
  }, [])

  const handleFindItFastCategories = useCallback((data) => {
    setFindItFast(data)
  }, [])

  const bottomrightnotify = (message) => toast(message, { position: "bottom-right", hideProgressBar: true, className: 'bg-success text-white' });

  const handleHeaderCategorySubmit = () => {
    let categoriesArray = headerCategory.map((val) => (val.value || val._id));
    let params = {
      categories: categoriesArray
    }
    dispatch(headerCategoriesData(params))
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="page-content">
      <div className="">
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Header Categories</h4>
          </CardHeader>
          <CardBody>
            <div className="mb-5">
              <MultiSelector handleSelectedFnc={handleHeaderCategory} selectedData={headerCategory} placeholder={"Select Categories"} />
            </div>
            <Button onClick={handleHeaderCategorySubmit} color="primary">
              Submit
            </Button>
          </CardBody>
        </Card>
      </div>
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Top Section</h4>
            <Button onClick={() => setTopSlider([])} color="danger">Clear</Button>
          </CardHeader>
          <CardBody>
            <div className="d-flex gap-3 justify-content-between">
              <div className="w-50">
                <ImageUpload imageUrl={topSlider[0]?.media_id?.url} size={"921x691"} handleImageUpload={handleImageUpload}
                  index={0} name="topSlider" />
                <div className="mt-1">
                  <Input
                    type="text"
                    className="form-control"
                    id="placeholderInput"
                    placeholder="Enter Link"
                    name="link"
                    value={topSlider[0]?.link || ''}
                    onChange={(e) => handleTopSliderInputChange(0, e)}
                  />
                </div>
              </div>
              <div className="w-25">
                <ImageUpload imageUrl={topSlider[1]?.media_id?.url} size={"921x339"} handleImageUpload={handleImageUpload}
                  index={1} name="topSlider" />
                <div className="mt-1">
                  <Input
                    type="text"
                    className="form-control"
                    id="placeholderInput"
                    placeholder="Enter Link"
                    name="link"
                    value={topSlider[1]?.link || ''}
                    onChange={(e) => handleTopSliderInputChange(1, e)}
                  />
                </div>
              </div>
              <div className="w-25">
                <ImageUpload imageUrl={topSlider[2]?.media_id?.url} size={"921x339"} handleImageUpload={handleImageUpload}
                  index={2} name="topSlider" />
                <div className="mt-1">
                  <Input
                    type="text"
                    className="form-control"
                    id="placeholderInput"
                    placeholder="Enter Link"
                    name="link"
                    value={topSlider[2]?.link || ''}
                    onChange={(e) => handleTopSliderInputChange(2, e)}
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Top Banner Section</h4>
            <Button onClick={() => setTopBanner([{ link: '' }, { link: '' }, { link: '' }])} color="danger">Clear</Button>
          </CardHeader>
          <CardBody>
            <div className="d-flex gap-3 justify-content-between">
              <div className="w-50">
                <ImageUpload imageUrl={topBanner[0]?.media_id?.url} size={"645x368"}
                  handleImageUpload={handleImageUpload}
                  index={0} name="topBanner" />
                <div className="mt-1">
                  <Input
                    type="text"
                    className="form-control"
                    id="placeholderInput"
                    placeholder="Enter Link"
                    name="link"
                    value={topBanner[0]?.link || ''}
                    onChange={(e) => handleTopBannerInputChange(0, e)}
                  />
                </div>
              </div>
              <div className="w-25">
                <ImageUpload imageUrl={topBanner[1]?.media_id?.url} size={"315x368"} handleImageUpload={handleImageUpload}
                  index={1} name="topBanner" />
                <div className="mt-1">
                  <Input
                    type="text"
                    className="form-control"
                    id="placeholderInput"
                    placeholder="Enter Link"
                    name="link"
                    value={topBanner[1]?.link || ''}
                    onChange={(e) => handleTopBannerInputChange(1, e)}
                  />
                </div>
              </div>
              <div className="w-25">
                <ImageUpload imageUrl={topBanner[2]?.media_id?.url} size={"315x368"} handleImageUpload={handleImageUpload}
                  index={2} name="topBanner"
                />
                <div className="mt-1">
                  <Input
                    type="text"
                    className="form-control"
                    id="placeholderInput"
                    placeholder="Enter Link"
                    name="link"
                    value={topBanner[2]?.link || ''}
                    onChange={(e) => handleTopBannerInputChange(2, e)}
                  />
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
        <Card>
          <CardHeader className="border-0 align-items-center">
            <h4 className="card-title mb-0 flex-grow-1">
              Find It Fast Section Footer
            </h4>
          </CardHeader>
          <CardBody>
            <div className="">
              <MultiSelector handleSelectedFnc={handleFindItFastCategories} selectedData={findItFast} placeholder={"Select Categories"} />
            </div>
          </CardBody>
        </Card>

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

export default Home;
