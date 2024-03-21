import { useNavigate } from "react-router-dom"
export default function Home() {
  const navigate = useNavigate();
  const LogoutHandler =  (event) => {
    event.preventDefault()
    localStorage.removeItem("token")
    localStorage.clear()
    navigate("/auth/login")
  }
  return (
    <>
      <h1>Home page</h1>
      <button onClick={LogoutHandler} style={{backgroundColor:"grey"}}>Logout</button>
    </>
  )
}
