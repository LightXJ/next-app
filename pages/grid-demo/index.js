import styles from './index.module.scss';

export default function Index(){
  return (
    <>
    <div className={styles.container}>
      <div className={`${styles.boxItem} ${styles.boxOne}`}>1</div>  
      <div className={`${styles.boxItem} ${styles.boxTwo}`}>2</div>  
      <div className={`${styles.boxItem} ${styles.boxThree}`}>3</div>  
      <div className={`${styles.boxItem} ${styles.boxFour}`}>4</div>  
      <div className={`${styles.boxItem} ${styles.boxFive}`}>5</div>
      <div className={`${styles.boxItem} ${styles.boxSix}`}>6</div>
      <div className={`${styles.boxItem} ${styles.boxSevent}`}>7</div>
    </div>
    </>
  )
}