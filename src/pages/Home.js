import React, { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import { getProducts } from "../services/api/product";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import { getCategories } from "../services/api/category";
import { toast } from "react-toastify";
import SubList from "../components/sub/SubList";
import { getSubs } from "../services/api/sub";
const Home = () => {
  const [dataNewArrivals, setDataNewArrivals] = useState({
    products: [],
    page: 1,
    totalPages: 0,
  });
  const [dataBestSellers, setDataBestSellers] = useState({
    products: [],
    page: 1,
    totalPages: 0,
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loadingPaganition, setLoadingPaganition] = useState(true);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(false);
  const [loadingBestSellers, setLoadingBestSellers] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  useEffect(() => {
    if (
      !loadingBestSellers &&
      !loadingNewArrivals &&
      dataNewArrivals.products.length === 0 &&
      dataBestSellers.products.length === 0
    ) {
      setLoadingPaganition(false);
    }
  }, [
    loadingBestSellers,
    loadingNewArrivals,
    dataNewArrivals.products.length,
    dataBestSellers.products.length,
  ]);

  useEffect(() => {
    const _getCategories = async () => {
      try {
        setLoadingCategories(true);
        const categories = await getCategories();
        setCategories(categories);
        setLoadingCategories(false);
      } catch (error) {
        setLoadingCategories(false);
        toast.error("Sorry something went wrong please try again.");
      }
    };
    _getCategories();
  }, []);

  useEffect(() => {
    const _getSubCategories = async () => {
      try {
        setLoadingSubCategories(true);
        const subs = await getSubs();
        setSubCategories(subs);
        setLoadingSubCategories(false);
      } catch (error) {
        setLoadingSubCategories(false);
      }
    };
    _getSubCategories();
  }, []);

  const _getProductNewArrivals = async (query) => {
    try {
      setLoadingNewArrivals(true);
      const newArrivals = await getProducts({
        page: query.page,
        limit: query.limit,
      });
      if (newArrivals) {
        const { products, totalPages, page } = newArrivals;
        setDataNewArrivals((state) => ({
          ...state,
          products,
          totalPages,
          page,
        }));
      }
      setLoadingNewArrivals(false);
    } catch (error) {
      setLoadingNewArrivals(false);
      console.log(error.message);
    }
  };
  useEffect(() => {
    _getProductNewArrivals({ page: dataNewArrivals.page, limit: 3 });
  }, [dataNewArrivals.page]);

  const _getProductBesellers = async (query) => {
    try {
      setLoadingBestSellers(true);
      const bestSellers = await getProducts({
        sort: query.sort,
        page: query.page,
        limit: query.limit,
      });
      if (bestSellers) {
        const { products, totalPages, page } = bestSellers;
        setDataBestSellers((state) => ({
          ...state,
          products,
          totalPages,
          page,
        }));
      }
      setLoadingBestSellers(false);
    } catch (error) {
      setLoadingBestSellers(false);
      console.log(error.message);
    }
  };
  useEffect(() => {
    _getProductBesellers({
      sort: "sold",
      limit: 3,
      page: dataBestSellers.page,
    });
  }, [dataBestSellers.page]);
  const handleOnChangePage = (page, type) => {
    switch (type) {
      case "ARRIVALS":
        setDataNewArrivals((state) => ({ ...state, page }));
        break;
      case "BESTSELLER":
        setDataBestSellers((state) => ({ ...state, page }));
        break;
      default:
        break;
    }
  };
  return (
    <React.Fragment>
      <div className="jumbotron  text-info h1 font-weight-bold text-center">
        <Jumbotron
          text={["Latest Products", "New Arrivals", "Best Sellers"]}
        ></Jumbotron>
      </div>
      <h4 className="text-center p-3 mt-5 b-5 display-3 jumbotron">
        New Arrivals
      </h4>
      <br />
      <NewArrivals
        loadingPaganition={loadingPaganition}
        data={dataNewArrivals}
        handleOnChange={handleOnChangePage}
        loading={loadingNewArrivals}
      ></NewArrivals>
      <h4 className="text-center p-3 mt-5 b-5 display-3 jumbotron">
        Best Sellers
      </h4>
      <BestSellers
        loadingPaganition={loadingPaganition}
        data={dataBestSellers}
        handleOnChange={handleOnChangePage}
        loading={loadingBestSellers}
      ></BestSellers>

      <h4 className="text-center p-3 mt-5 b-5 display-3 jumbotron">
        Categories
      </h4>
      <CategoryList
        loading={loadingCategories}
        categories={categories}
      ></CategoryList>

      <h4 className="text-center p-3 mt-5 b-5 display-3 jumbotron">
        Sub category
      </h4>
      <SubList
        loading={loadingSubCategories}
        subCategories={subCategories}
      ></SubList>
    </React.Fragment>
  );
};
export default Home;
