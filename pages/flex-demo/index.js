import { useState } from 'react';
import styles from './index.module.scss';

export default function Index(){
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse(collapse=>!collapse)
  }

  return (
    <>
    <div className={styles.container}>
      <div className={`${styles.boxItem} ${styles.boxOne}`}>内容块1</div>  
      <div className={`${styles.boxItem} ${styles.boxTwo}`}>内容块2</div>  
      <div className={styles.boxItem}>内容块3</div>  
      <div className={styles.boxItem}>内容块4</div>  
    </div>

    <div className={`${styles.pageContainer}`}>
      <div className={`${styles.leftTree} ${collapse ? styles.collapse:''}`}>
        <div className={`${styles.treeContent}`}>
          左侧导航栏
        </div>
        <div className={`${styles.collapseBtn} ${collapse ? styles.collapse:''}`} onClick={handleCollapse}>{!collapse ? '收起': '展开'}</div>
      </div>
      <div className={`${styles.rightContent}`}>右侧内容区</div>
    </div>
    </>
  )
}