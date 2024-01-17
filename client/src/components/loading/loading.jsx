import styles from "../loading/loading.module.css"

function Loading() {
  return (
    <div className={styles.detailContainer}>
      <img className={styles.loadingGif} src="https://media.giphy.com/media/daak2Jqk5NZN2G4PKD/giphy.gif" alt="Loading" />
    </div>
  )
}

export default Loading;