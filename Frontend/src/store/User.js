import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null, // To hold user data after signin
  register: async (userData) => {
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Do not set user here, only handle registration
        return { success: true, message: "Account created successfully" };
      }
      return { success: false, message: data.message || "Registration failed" };
    } catch (error) {
      return { success: false, message: "Something went wrong" };
    }
  },
  signin: async (credentials) => {
    try {
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        set({ user: data.user });
        return { success: true, message: "Signin successful" };
      }
      return { success: false, message: data.message || "Signin failed" };
    } catch (error) {
      return { success: false, message: "Something went wrong" };
    }
  },
  signout: async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        set({ user: null });
        return { success: true, message: data.message }; // Success message
      }
      return { success: false, message: data.message || "Signout failed" };
    } catch (error) {
      return { success: false, message: "Something went wrong" };
    }
  },
}));
