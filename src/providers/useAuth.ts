import { useContext } from "react";
import { AuthContext } from "./AuthProvider";


// eslint-disable-next-line react-hooks/rules-of-hooks
const useAuth = () => useContext(AuthContext)

export default useAuth