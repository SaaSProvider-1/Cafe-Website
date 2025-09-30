import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/admin/verify`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setAdmin(data.data.admin);
          setIsAuthenticated(true);
        } else {
          // Token is invalid, remove it
          localStorage.removeItem("adminToken");
          setIsAuthenticated(false);
          setAdmin(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("adminToken");
        setIsAuthenticated(false);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [API_BASE_URL]);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/verify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAdmin(data.data.admin);
        setIsAuthenticated(true);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem("adminToken");
        setIsAuthenticated(false);
        setAdmin(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("adminToken");
      setIsAuthenticated(false);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const validateLicenseKey = async (licenseKey) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/admin/validate-license`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ licenseKey }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "License validation failed");
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error("License validation error:", error);
      return {
        success: false,
        error: error.message || "License validation failed. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const createAdminAccount = async (accountData) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/admin/create-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(accountData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Account creation failed");
      }

      // Store token and set admin state
      localStorage.setItem("adminToken", data.data.token);
      setAdmin(data.data.admin);
      setIsAuthenticated(true);

      return { success: true, data: data.data };
    } catch (error) {
      console.error("Account creation error:", error);
      return {
        success: false,
        error: error.message || "Account creation failed. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const requestLicenseKey = async (email) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/admin/request-license`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "License request failed");
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error("License request error:", error);
      return {
        success: false,
        error: error.message || "License request failed. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token securely
      localStorage.setItem("adminToken", data.data.token);

      // Update state
      setAdmin(data.data.admin);
      setIsAuthenticated(true);

      return { success: true, data: data.data };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "Login failed. Please try again.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (token) {
        // Notify backend of logout
        await fetch(`${API_BASE_URL}/admin/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local state regardless of API call success
      localStorage.removeItem("adminToken");
      setIsAuthenticated(false);
      setAdmin(null);
    }
  };

  const value = {
    isAuthenticated,
    admin,
    loading,
    login,
    logout,
    checkAuthStatus,
    validateLicenseKey,
    createAdminAccount,
    requestLicenseKey,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
