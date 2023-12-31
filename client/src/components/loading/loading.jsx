import styles from "../loading/loading.module.css"

function Loading() {
  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.loadingText}>Loading...</h1>
    </div>
  )
}

export default Loading;