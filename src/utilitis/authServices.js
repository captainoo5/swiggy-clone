
export const saveAuth = (token, user) =>{
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(user));
};


export const saveUserAuth = (token, user) =>{
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
};
export const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    localStorage.removeItem("food_cart");
}


