import styles from "../loading/loading.module.css"
import gif from "../../../public/Loading GIF - Loading - Discover & Share GIFs.gif"


function Loading2() {
  return (
    <div className={styles.detailContainer}>
      <img className={styles.loadingGif} src={gif} alt="Loading" />
    </div>
  )
}

export default Loading2;