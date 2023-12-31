import Forms from "../../components/form/form"
import Styles from "./createForm.module.css"
import { useNavigate } from "react-router-dom"

function CreateForm() {
  const navigate = useNavigate();

  return (
    <>
    <div>
      <Forms/>
    </div>
    <div>
      <button className={Styles.enterButton} onClick={()=>{navigate("/home")}}> Volver a home</button>
    </div>
    </>
  )
}

export default CreateForm