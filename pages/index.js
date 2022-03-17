import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          示例列表
        </h1>

        <div className={styles.box}>
          <h3>取消请求</h3>
          <ul className={styles.grid}>
            <li>
              <a href="https://nextjs.org/docs" className={styles.card}>
                <h2>Documentation &rarr;</h2>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>
            </li>
            <li>
              <a href="https://nextjs.org/learn" className={styles.card}>
                <h2>Learn &rarr;</h2>
                <p>Learn about Next.js in an interactive course with quizzes!</p>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/vercel/next.js/tree/master/examples"
                className={styles.card}
              >
                <h2>Examples &rarr;</h2>
                <p>Discover and deploy boilerplate example Next.js projects.</p>
              </a>

            </li>
            <li>
              <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className={styles.card}
              >
                <h2>Deploy &rarr;</h2>
                <p>
                  Instantly deploy your Next.js site to a public URL with Vercel.
                </p>
              </a>
            </li>
          </ul>
        </div>
        
      </main>
    </div>
  )
}
