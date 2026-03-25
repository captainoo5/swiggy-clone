
export const saveAuth = (token, user) =>{
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(user));
};

export const getTOken = () => localStorage.getItem("token");

export const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
}

import axios from "axios";

export const verifyAdmin = async () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data.data;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    return null;
  }
};