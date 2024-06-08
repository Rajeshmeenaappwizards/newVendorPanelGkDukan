import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  cancelOrderData,
  getAllOrdersData,
  getOrdersByStatusData,
  getSingleOrderData,
  readyToShipOrder,
} from "../../helpers/fakebackend_helper";

export const getAllOrders = createAsyncThunk(
  "order/getOrdersData",
  async (data) => {
    try {
      const response = getAllOrdersData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getOrdersByStatus = createAsyncThunk(
  "order/getOrdersByStatus",
  async (slug) => {
    try {
      const response = getOrdersByStatusData(slug);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getSingleOrder = createAsyncThunk(
  "order/getSingleOrder",
  async (orderId) => {
    try {
      const response = getSingleOrderData(orderId);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId) => {
    try {
      const response = cancelOrderData(orderId);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const readyToShip = createAsyncThunk(
  "order/readyToShip",
  async (orderId) => {
    try {
      const response = readyToShipOrder(orderId);
      return response;
    } catch (error) {
      return error;
    }
  }
);