import { useEffect, useRef, useState } from "react";
import ResizeObserver from 'resize-observer-polyfill';
import styles from './index.module.scss';


export default function Index(){
  const [needMoreBtn, useNeedMoreBtn] = useState(false);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const tabWrapRef = useRef<HTMLUListElement>(null);
  const moreBtnRef = useRef<HTMLDivElement>(null);

  // 动态监听元素大小
  useEffect(()=>{
    if(tabWrapRef.current){
      const tabWrapElem = tabWrapRef.current;
      const tabTrueWidth = tabWrapElem?.scrollWidth;  // 真实宽度， 实际内容区+padding
      console.log('tabTrueWidth', tabTrueWidth);

      const ro = new ResizeObserver((entries: Array<ResizeObserverEntry>) => {
        for (const entry of entries) {
            const {left, top, width, height} = entry.contentRect;
     
            console.log('Element:', entry.target);
            console.log(`Element's size: ${ width }px x ${ height }px`);
            console.log(`Element's paddings: ${ top }px ; ${ left }px`);
        }
      });
     
      ro.observe(tabWrapRef.current);
    }
    if(tabContainerRef){
      const tabContainerElem = tabContainerRef.current;
      const contentWidth = tabContainerElem?.clientWidth;  // 内容区宽度
      console.log('contentWidth', contentWidth);
    }
  }, [])


  const tabList = [
    {
      id: '1',
      name: 'tab1',
    },
    {
      id: '2',
      name: 'tab1',
    },
    {
      id: '3',
      name: 'tab1',
    },
    {
      id: '4',
      name: 'tab1',
    }
  ]

  // 处理元素上的鼠标滑动事件
  const handleWheel = () => {
    console.log('sdf');
  }

  return (
    <>
      <div className={styles.container} ref={tabContainerRef}>
        <ul className={styles.tabWrap} ref={tabWrapRef} onWheel={handleWheel}>
          {tabList.map(item=>{
            return (
              <li className={styles.tabItem} key={item.id}>{item.name}</li>
            )
          })}
        </ul>
        {needMoreBtn && <div className={styles.moreBtn}>...</div>}
      </div>
    </>
  )
}