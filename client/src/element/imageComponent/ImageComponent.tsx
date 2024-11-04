import { useContexts } from "@/Context/context";
import { useState } from "react";
interface PropsType {
  classename: string;
  path: string;
  style: object;
}
function ImageComponent(props: PropsType) {
  let { isLoading } = useContexts();
  let { classename, path, style } = props;
  let [src, setSrc] = useState(path);
  const Handleimageissue = () => {
    return setSrc("/itemBackground.webp");
  };
  return (
    <img
      className={classename}
      src={isLoading ? "/itemBackground.webp" : src}
      style={style}
      onError={Handleimageissue}
      alt=""
    />
  );
}

export default ImageComponent;
