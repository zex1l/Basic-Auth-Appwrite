import { ID } from "appwrite";
import {
    createContext,
    useState,
    FC, 
    PropsWithChildren,
    useEffect,

} from 'react'
import {account} from "../auth-write-db";


interface IUser {
    email: string
    password: string
    $id: string
}

export interface IAuthContext {
    user : IUser | null
    authUser: (
        email : string,
        passwod: string,
        isRegister: boolean
    ) => Promise<void>

    logoutUser: () => Promise<void>
}

export const AuthContext = createContext<IAuthContext>({
	authUser: async () => {},
	logoutUser: async () => {},
	user: null,
})

const AuthProvider : FC<PropsWithChildren> = ({children}) => {
    const [isLoaing, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        
        checkUserStatus()

    }, [])


    const authUser = async(
        email: string,
		password: string,
		isRegister = false
    ) => {
        try {
            
            
            setIsLoading(true)
            if(isRegister) {
                await account.create(ID.unique(), email, password)
            }
                await account.createEmailPasswordSession(email, password)
            
            setUser(await account.get())

            setIsLoading(false)
            
        } catch(error){
            setUser(null)
            console.log(error)
            
        }
    }

    const checkUserStatus = async() => {
        setIsLoading(true)
        try {
            setUser(await account.get())
        }
        catch(err) {
            setUser(null)
        }
        finally {
            setIsLoading(false)
        }
    }

    const logoutUser = async () => {
        setIsLoading(true)
		await account.deleteSession('current')
		setUser(null)
		setIsLoading(false)
	}

	const contextData: IAuthContext = {
		user,
		authUser,
		logoutUser,
	}

    return (
        <AuthContext.Provider value={contextData}>
            {isLoaing ? <div >...Loading</div> : <>{children}</>}
        </AuthContext.Provider>
    )

}



export default AuthProvider
