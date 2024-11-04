import "./Slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ElementInSlider from "../ElementInSlider/ElementInSlider";
interface PropType {
  l: Array<FoodElemnt>;
}
type FoodElemnt = {
  n: string;
  _id: string;
  v: number;
  ct: string;
  o: number;
  i: string;
  p: number;
};
const ParentSlider = (props: PropType) => {
  let { l } = props;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <Slider {...settings}>
      {l.map((e) => {
        let { n, v, i, p } = e;
        if (v == 1) {
          let myValue = {
            n: n,
            p: p,
            i: i,
          };
          return <ElementInSlider myValue={myValue} />;
        }
        {
        }
        return <></>;
      })}
    </Slider>
  );
};

export default ParentSlider;
