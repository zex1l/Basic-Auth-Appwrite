import FormAuth from "./components/FormAuth/FormAuth"
import useAuth from "./providers/useAuth"

function App() {
  
  const {user, logoutUser} = useAuth()

  return (
    <section className="main">
      {
        user ? 
        <>
          <div className="main__title">Welcome</div>
          <button
          className="main__button"
            onClick={logoutUser}
          >
            Выйти
          </button>
        </>
        : 
        
        <FormAuth/>
      }

    </section>
  )
}

export default App
