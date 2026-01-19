import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../Firebase/Firebase";


export const AuthContextAPI = createContext();

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // singup funcation
    const handelRegisterUser = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    // update name and user 
    const handelUpdate = (name, photo) => {
       return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		});
    }

const googleProvider = new GoogleAuthProvider();
    // sing in with google 
    const handelSingInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    // sing in with email 
    const handelSingInWithEmail = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    }

    const handelLogOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])


    // auth info object 
    const authInfo = {
		user,
		loading,
		handelRegisterUser,
		handelUpdate,
		handelSingInWithEmail,
		handelLogOut,
		handelSingInWithGoogle,
	};

    return (
        <AuthContextAPI.Provider value={authInfo}>
            {children}
        </AuthContextAPI.Provider>
    );
};

export default AuthProvider;