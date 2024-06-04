import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllSupportTicketList,
  deleteSupportTicketData,
  addSupportTicketData,
  getSingleSupportTicketData,
  statusUpdateSupportTicketData,
  addMessageToSupportTicketData,
  getSupportStatsDataApi,
} from "../../helpers/fakebackend_helper";

//Include Both Helper File with needed methods

export const getSupportTicket = createAsyncThunk(
  "supportTicket/getSupportTicketData",
  async (data) => {
    try {
      const response = getAllSupportTicketList(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteSupportTicket = createAsyncThunk(
  "supportTicket/deleteSupportTicketData",
  async (id) => {
    try {
      const response = deleteSupportTicketData(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addSupportTicket = createAsyncThunk(
  "supportTicket/addSupportTicketData",
  async (data) => {
    try {
      const response = addSupportTicketData(data);

      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getSingleSupportTicket = createAsyncThunk(
  "supportTicket/getSingleSupportTicketData",
  async (id) => {
    try {
      const response = getSingleSupportTicketData(id);

      return response;
    } catch (error) {
      return error;
    }
  }
);

export const statusUpdateSupportTicket = createAsyncThunk(
  "supportTicket/statusUpdateSupportTicketData",
  async (data) => {
    try {
      const response = await statusUpdateSupportTicketData(data);

      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addMessageToSupportTicket = createAsyncThunk(
  "supportTicket/addMessageToSupportTicketData",
  async (data) => {
    try {
      const response = await addMessageToSupportTicketData(data);

      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getSupportStatsData = createAsyncThunk(
  "supportTicket/getSupportStatsData",
  async (data) => {
    try {
      const response = await getSupportStatsDataApi(data);

      return response;
    } catch (error) {
      return error;
    }
  }
);