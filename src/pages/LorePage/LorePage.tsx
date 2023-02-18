import React from "react";
import logo from "../../assets/try.jpg";
import s from "./LorePage.module.scss";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

export const LorePage = () => {
  const refWrapper = React.useRef<null | HTMLImageElement>(null);
  const [loadImg, setLoadImg] = React.useState(false);
  const onUpdate = React.useCallback(({ x, y, scale }: { x: number; y: number; scale: number }) => {
    const { current: img } = refWrapper;

    if (img) {
      const value = make3dTransformValue({ x, y, scale });
      img.style.setProperty("transform", value);
    }
  }, []);
  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        {!loadImg && <div className={s.loadingWindow}>Loading....</div>}
        <QuickPinchZoom onUpdate={onUpdate} maxZoom={20} wheelScaleFactor={150} tapZoomFactor={2}>
          <img src={logo} alt="" ref={refWrapper} onLoad={() => setLoadImg(true)} />
        </QuickPinchZoom>
      </div>
      <div className={s.info}>
        <span>Zoom: double click, ctrl+scroll</span>
      </div>
    </div>
  );
};
