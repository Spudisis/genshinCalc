import React from 'react'

import s from './LorePage.module.scss'
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom'
import top1 from '../../assets/lore/top1.svg'
import bot1 from '../../assets/lore/bot1.svg'
import top2 from '../../assets/lore/top2.svg'
import bot2 from '../../assets/lore/bot2.svg'
import top3 from '../../assets/lore/top3.svg'
import bot3 from '../../assets/lore/bot3.svg'
import top4 from '../../assets/lore/top4.svg'
import bot4 from '../../assets/lore/bot4.svg'
import top5 from '../../assets/lore/top5.svg'
import bot5 from '../../assets/lore/bot5.svg'
import bot6 from '../../assets/lore/bot6.svg'
import top6 from '../../assets/lore/top6.svg'
import bot7 from '../../assets/lore/bot7.svg'
import top7 from '../../assets/lore/top7.svg'
export const Lore = () => {
  const refWrapper = React.useRef<null | HTMLImageElement>(null)
  const [loadImg, setLoadImg] = React.useState(false)
  const onUpdate = React.useCallback(({ x, y, scale }: { x: number; y: number; scale: number }) => {
    const { current: img } = refWrapper

    if (img) {
      const value = make3dTransformValue({ x, y, scale })
      img.style.setProperty('transform', value)
    }
  }, [])
  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        {!loadImg && <div className={s.loadingWindow}>Loading....</div>}
        <QuickPinchZoom onUpdate={onUpdate} maxZoom={20} wheelScaleFactor={150} tapZoomFactor={2}>
          <div ref={refWrapper} className={s.gridImages}>
            <div>
              <img src={top1} alt='' onLoad={() => setLoadImg(true)} />
              <img src={top2} alt='' onLoad={() => setLoadImg(true)} />
              <img src={top3} alt='' onLoad={() => setLoadImg(true)} />
              <img src={top4} alt='' onLoad={() => setLoadImg(true)} />
              <img src={top5} alt='' onLoad={() => setLoadImg(true)} />
              <img src={top6} alt='' onLoad={() => setLoadImg(true)} />
              <img src={top7} alt='' onLoad={() => setLoadImg(true)} />
            </div>
            <div>
              <img src={bot1} alt='' onLoad={() => setLoadImg(true)} />
              <img src={bot2} alt='' onLoad={() => setLoadImg(true)} />
              <img src={bot3} alt='' onLoad={() => setLoadImg(true)} />
              <img src={bot4} alt='' onLoad={() => setLoadImg(true)} />
              <img src={bot5} alt='' onLoad={() => setLoadImg(true)} />
              <img src={bot6} alt='' onLoad={() => setLoadImg(true)} />
              <img src={bot7} alt='' onLoad={() => setLoadImg(true)} />
            </div>
          </div>
        </QuickPinchZoom>
      </div>
      <div className={s.info}>
        <span>Zoom: double click, ctrl+scroll</span>
      </div>
    </div>
  )
}
