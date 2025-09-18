import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const role = user?.role ? user.role.toLowerCase() : null;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

      const login = (userData) => {
        const normalizedUser = {
          ...userData,
          role: userData.role?.toLowerCase() || "user", 
        };
        console.log(" Saving user to localStorage:", normalizedUser);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        setUser(normalizedUser);
       setTimeout(()=>{
         toast.success(`Welcome back, ${normalizedUser.fullname || "User"}!`);
       }, 300)
      };


      const logout = () => {
        setUser(null); 
        setTimeout(() => {
          localStorage.removeItem("user");
          navigate("/home");
           toast.success("You have been logged out.");
        }, 1000);
       
      };


  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
