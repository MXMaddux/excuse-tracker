import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    return savedUser || null;
  });

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [signInEmail, setSignInEmail] = useState(""); 
  const [signInPassword, setSignInPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      localStorage.setItem('currentUser', JSON.stringify(auth.currentUser));
      navigate("/scenarioform");
    } catch (error) {
      setErrorMessage("Invalid. Please try again.");
      console.error(error);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      setUser(auth.currentUser);
      localStorage.setItem('currentUser', JSON.stringify(auth.currentUser));
      navigate("/scenarios");
    } catch (error) {
      setErrorMessage("Invalid. Please try again.");
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setUser(auth.currentUser);
      localStorage.setItem('currentUser', JSON.stringify(auth.currentUser));
      navigate("/scenarios");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('currentUser');
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        signIn,
        signInWithGoogle,
        logout,
        setEmail,
        setPassword,
        setSignInEmail,
        setSignInPassword,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
