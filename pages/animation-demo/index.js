import { useState } from 'react';
import styles from './index.module.scss';

const configList = [
  {
    icon: '/images/icon-first.png',
    summary: '余音绕梁',
    bgImage: 'https://image.baidu.com/search/detail?tn=baiduimagedetail&word=%E5%9F%8E%E5%B8%82%E5%BB%BA%E7%AD%91%E6%91%84%E5%BD%B1%E4%B8%93%E9%A2%98&album_tab=%E5%BB%BA%E7%AD%91&album_id=7&ie=utf-8&fr=albumsdetail&cs=825057118,3516313570&pi=3983&pn=6&ic=0&objurl=https%3A%2F%2Ft7.baidu.com%2Fit%2Fu%3D825057118%2C3516313570%26fm%3D193%26f%3DGIF',
    title: 'AI 神器之妙笔生花',
    subTitle: '文字描述一键AIGC生成图片，人物形象、背景画面，独一无二，再也不愁图片素材，海量无限极独享图片库',
  },
  {
    icon: 'images/icon-second.png',
    summary: '余音绕梁',
    bgImage: 'images/second.jpeg',
    title: 'AI 神器之妙笔生花',
    subTitle: '文字描述一键AIGC生成图片，人物形象、背景画面，独一无二，再也不愁图片素材，海量无限极独享图片库',
  },
  {
    icon: 'images/icon-third.png',
    summary: '余音绕梁',
    bgImage: 'images/third.jpeg',
    title: 'AI 神器之妙笔生花',
    subTitle: '文字描述一键AIGC生成图片，人物形象、背景画面，独一无二，再也不愁图片素材，海量无限极独享图片库',
  },
  {
    icon: 'images/icon-fourth.png',
    summary: '余音绕梁',
    bgImage: 'images/fourth.jpeg',
    title: 'AI 神器之妙笔生花',
    subTitle: '文字描述一键AIGC生成图片，人物形象、背景画面，独一无二，再也不愁图片素材，海量无限极独享图片库',
  }
]

const AnimationDemo = () => {
  const [activeId, setActiveId] = useState(0);

  return (
    <div className={styles['animation-demo-page']}>
      <div className={styles['list-wrap']}>
        {
          configList.map((item, index) => {
            return (
              <div
                key={index}
                className={[styles['item-wrap'], activeId === index? styles['active']:'']}
                style={{ backgroundImage: `url(${item.bgImage})` }}
              >
                <p className={styles["title"]}>{item.title}</p>
                <p className={styles["subTitle"]}>{item.subTitle}</p>
                <div className={styles['mini-content']}>
                  <img src={item.icon} alt="" />
                  <div className={styles['summary']}>{item.summary}</div>
                </div>
              </div>)
          })
        }
      </div>
    </div>
  )
}

export default AnimationDemo;