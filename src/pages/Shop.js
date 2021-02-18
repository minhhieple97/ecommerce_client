import {
  AppstoreOutlined,
  BgColorsOutlined,
  DollarOutlined,
  DownSquareOutlined,
  RocketOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Checkbox, Menu, Slider } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BrandList from "../components/brand/BrandList";
import CategoryCheckBox from "../components/category/CategoryCheckBox";
import ColorList from "../components/color/ColorList";
import Star from "../components/forms/Star";
import PaginationList from "../components/PaginationList";
import ProductList from "../components/product/ProductList";
import ShippingsCheckbox from "../components/shipping/ShippingsCheckbox";
import Spinner from "../components/Spinner";
import SubsLabel from "../components/sub/SubsLabel";
import { getCategories } from "../services/api/category";
import { getProducts } from "../services/api/product";
import { getSubs } from "../services/api/sub";
import { searchQuery } from "../store/actions";
import { ENUM_BRANDS, ENUM_COLORS } from "../ultil/constants";
const Shop = () => {
  const firstRender = useRef(true);
  const [productsData, setProductsData] = useState({
    products: [],
    page: 1,
    totalPages: 0,
    limit: 2
  });
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState([0, 0]);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const { text } = useSelector((state) => state.search);
  const [categoryIds, setCategoryIds] = useState([]);
  const [brands] = useState(ENUM_BRANDS);
  const [colors] = useState(ENUM_COLORS);
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [shipping, setShipping] = useState("");
  const [star, setStar] = useState("");
  const [sub, setSub] = useState("");
  const [allRatings, setAllRatings] = useState(true);
  const [allSubs, setAllSubs] = useState(true);
  const dispatch = useDispatch();
  const _getProducts = useCallback(
    async (value) => {
      try {
        const { limit, page } = productsData
        const query = { limit, page };
        if ("name" in value && value.name.trim()) {
          query.name = value.name;
        }
        if ("prices" in value) {
          value.prices[0] > 0 && (query.priceGt = prices[0]);
          value.prices[1] > 0 && (query.priceLt = prices[1]);
        }
        if (categoryIds.length > 0) {
          query.category = categoryIds;
        }
        if ("star" in value && value.star) {
          query.star = value.star;
        }
        if ("sub" in value && value.sub) {
          query.sub = value.sub;
        }
        if ("brand" in value && value.brand) {
          query.brand = value.brand;
        }
        if ("color" in value && value.color) {
          query.color = value.color;
        }
        if ("shipping" in value && value.shipping) {
          query.shipping = value.shipping;
        }
        const { products, totalPages: newTotalPages, page: newPage, limit: newLimit } = await getProducts(query);
        setProductsData({ products, totalPages: newTotalPages, page: newPage, limit: newLimit });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setProductsData({
          products: [],
          page: 1,
          totalPages: 0,
          limit: 2
        });
        toast.error(error.message);
      }
    },
    [prices, categoryIds]
  );
  const _getCategories = async () => {
    try {
      const [categories, subs] = await Promise.all([
        getCategories(),
        getSubs(),
      ]);
      setCategories(categories);
      setSubs(subs);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleOnChangeCheckBox = (e) => {
    const categoryIdsObj = { [e.target.name]: e.target.checked };
    const newCategoryIds = [...categoryIds].filter(
      (value) => value !== e.target.name
    );
    for (const key in categoryIdsObj) {
      if (categoryIdsObj[key]) {
        newCategoryIds.push(key);
      }
    }
    setCategoryIds([...newCategoryIds]);
  };
  const handleOnChangeBrand = (e) => {
    const newBrand = e.target.value;
    if (newBrand === brand) {
      setBrand("");
    } else {
      setBrand(newBrand);
    }
  };
  const handleOnChangeColor = (e) => {
    const newColor = e.target.value;
    if (newColor === color) {
      setColor("");
    } else {
      setColor(newColor);
    }
  };
  const handleSubOnClick = (s) => {
    setSub(s);
    setAllSubs(false);
    setCategoryIds([]);
  };
  const handleOnchangePrice = (val) => {
    setPrices(val);
  };
  useEffect(() => {
    _getCategories();
    return () => dispatch(searchQuery(""));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setLoading(true);
    let time = 0;
    if (firstRender.current) {
      firstRender.current = false;
    }
    else {
      time = 2000
    }
    const timeout = setTimeout(() => {
      _getProducts({
        name: text,
        prices,
        categoryIds,
        star,
        sub,
        brand,
        color,
        shipping,

      });
    }, time);
    return () => clearTimeout(timeout);
  }, [
    text,
    _getProducts,
    prices,
    categoryIds,
    star,
    sub,
    brand,
    color,
    shipping,
    productsData.page
  ]);
  const handleStarClick = (num) => {
    setStar(num);
    setAllRatings(false);
  };
  const handleOnChangeShipping = (e) => {
    const newVal = e.target.value;
    if (newVal === shipping) {
      setShipping("");
    } else {
      setShipping(newVal);
    }
  };
  const handleOnChangeAllRatings = (e) => {
    setAllRatings(e.target.checked);
    if (e.target.checked) setStar("");
  };
  const handleOnChangeAllSubs = (e) => {
    setAllSubs(e.target.checked);
    if (e.target.checked) setSub("");
  };
  const handleOnChangePage = (page) => {
    setProductsData((state) => ({ ...state, page }))
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-3">
          <h4 className="pb-2 ml-3">Search/filter menu</h4>
          <hr />
          <Menu mode="inline" defaultOpenKeys={[]}>
            {/* Price Slider */}
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined />
                  Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={prices}
                  onChange={handleOnchangePrice}
                  max="2000"
                ></Slider>
              </div>
            </SubMenu>
            {/* Category filter */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Categories
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }}>
                {
                  <CategoryCheckBox
                    handleOnChange={handleOnChangeCheckBox}
                    categories={categories}
                    categoryIds={categoryIds}
                  ></CategoryCheckBox>
                }
              </div>
            </SubMenu>
            {/* Star filter */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined />
                  Rating
                </span>
              }
            >
              <div className="pr-4 pl-4 pb-2">
                <Checkbox
                  checked={allRatings}
                  onChange={handleOnChangeAllRatings}
                  style={{ marginBottom: "10px" }}
                >
                  All ratings
                </Checkbox>
                {/* <hr /> */}
                <br />
                <Star starClick={handleStarClick} numberOfStars={5}></Star>
                <br />
                <Star starClick={handleStarClick} numberOfStars={4}></Star>
                <br />
                <Star starClick={handleStarClick} numberOfStars={3}></Star>
                <br />
                <Star starClick={handleStarClick} numberOfStars={2}></Star>
                <br />
                <Star starClick={handleStarClick} numberOfStars={1}></Star>
              </div>
            </SubMenu>
            {/*Sub category filter */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined />
                  Sub categories
                </span>
              }
            >
              <div
                className="pl-4 pr-4"
              >
                {
                  <>
                    <Checkbox
                      checked={allSubs}
                      onChange={handleOnChangeAllSubs}
                    >
                      All sub categories
                    </Checkbox>
                    <hr />
                    <SubsLabel
                      handleOnClick={handleSubOnClick}
                      subs={subs}
                    ></SubsLabel>
                  </>
                }
              </div>
            </SubMenu>
            {/*Brand filter */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <AppstoreOutlined />
                  Brands
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {
                  <BrandList
                    brand={brand}
                    brands={brands}
                    handleOnChange={handleOnChangeBrand}
                  ></BrandList>
                }
              </div>
            </SubMenu>
            {/*Color filter */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <BgColorsOutlined />
                  Colors
                </span>
              }
            >
              <div style={{ marginTop: "-10px" }} className="pr-5">
                {
                  <ColorList
                    color={color}
                    colors={colors}
                    handleOnChange={handleOnChangeColor}
                  ></ColorList>
                }
              </div>
            </SubMenu>
            {/*Shipping filter */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <RocketOutlined />
                  Shipping
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {
                  <ShippingsCheckbox
                    shipping={shipping}
                    handleOnChange={handleOnChangeShipping}
                  ></ShippingsCheckbox>
                }
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-3">
          {loading ? (
            <Spinner></Spinner>
          ) : (
              <>
                <h4>Products</h4>
                {productsData.products.length < 1 && (
                  <h4 className="text-center">We could not find any products.</h4>
                )}
                <div className="row pb-5">
                  <ProductList products={productsData.products}></ProductList>
                </div>
                <div className="row offset-md-4 pt-5 p-3">
                  <PaginationList
                    handleOnChange={handleOnChangePage}
                    page={productsData.page}
                    totalPages={productsData.totalPages}
                    simple={false}
                  />
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
