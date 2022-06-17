import styles from '../styles/Home.module.css'
import Link from 'next/link';

const pageList = [
  {
    name: 'use-memo-demo',
    desc: '这是一个useMemo的示例',
    href: '/use-memo-demo',
  },
  {
    name: 'use-memo-demo',
    desc: '这是一个useMemo的示例',
    href: '/use-memo-demo',
  }
];

export default function Home() {
  
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          示例列表
        </h1>

        <div>
          <ul>
              {
                pageList.map((curPage, index)=>{
                  return (
                  <li key={index} className={styles.box}>
                    <div>组件名称：{curPage.name}</div>
                    <div>描述：{curPage.desc}</div>
                    <Link href={curPage.href}>
                      <a style={{ color: 'blue'}}>前往</a>
                    </Link>
                  </li>
                )
              })
            }
        </ul>
        </div>
        
      </main>
    </div>
  )
}
