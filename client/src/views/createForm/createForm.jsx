import Forms from "../../components/form/form"
import Styles from "./createForm.module.css"
import { useNavigate } from "react-router-dom"

function CreateForm() {
  const navigate = useNavigate();

  return (
    <>
    <div className={Styles.containerButton}>
      <button className={Styles.enterButton} onClick={()=>{navigate("/home")}}> Return to home</button>
    </div>
    <div>
      <Forms/>
    </div>
    </>
  )
}

export default CreateForm