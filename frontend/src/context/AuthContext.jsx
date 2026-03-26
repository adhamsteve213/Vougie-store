import React ,{ useEffect, useState,useContext, createContext} from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    
    // store raw token (no prefix); callers will format header as `Token ${token}`
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [role, setRole] = useState(() => localStorage.getItem("role"));
    const [user, setUser] = useState(()=>{
        const u = localStorage.getItem("user");
        return u ? JSON.parse(u) : null;
    });
    
    useEffect(() => {

    const onStorage =(e) =>{
        if (e.key === "token") setToken(e.newValue);
        if (e.key === "role") setRole(e.newValue);
        if (e.key === "user") setUser(e.newValue ? JSON.parse(e.newValue) : null);
    }
    window.addEventListener("storage", onStorage);
    return ()=> window.removeEventListener("storage", onStorage);
    }, []);
    const login = (token, role, user) => {
        // Store raw token and set state; contexts will prefix when building headers
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setRole(role);
        setUser(user);
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        setToken(null);
        setRole(null);
        setUser(null);
    };
    const getAuthHeaders = (opts = {}) => {
        if (!token) return {};
        const base = { Authorization: `Token ${token}` };
        if (opts.json !== false) base['Content-Type'] = 'application/json';
        return { ...base, ...(opts.extra || {}) };
    };

    return (
        <AuthContext.Provider value={{ token, role, user, login, logout, getAuthHeaders }}>
            {children}
        </AuthContext.Provider>
    );

};

