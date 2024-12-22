import React, { createContext, useEffect, useState } from "react";
import AccountService from "../services/AccountService";
import DiscountService from "../services/DiscountService";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState([]);
  const [profile, setProfile] = useState({});
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchLoggedIn = async () => {
      const loggedIn = await AccountService.isAuthenticated();
      setIsAuthenticated(loggedIn);
    };

    fetchLoggedIn();
  }, []);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await DiscountService.getDiscounts();
        setDiscounts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDiscounts();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await AccountService.GetProfile();
        // console.log(response.data);

        setProfile(response?.data);
      } catch (error) {
        setProfile({});
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  //Fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await AccountService.GetRoles();
        // console.log(response);

        setRoles(response?.data);
      } catch (error) {
        setRoles([]);
      }
    };

    if (isAuthenticated) {
      fetchRoles();
    }
  }, [isAuthenticated]);

  const exportValue = {
    isAuthenticated,
    setIsAuthenticated,
    roles,
    setRoles,
    profile,
    setProfile,
    discounts,  
    setDiscounts,
  };

  return (
    <GlobalContext.Provider value={exportValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
