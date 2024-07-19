import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PropTypes from "prop-types";

const settings = {
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 2000,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  pauseOnHover: true,
  focusOnSelect: true,
  adaptiveHeight: true,
  useTransform: true,
  cssEase: "linear",
};

export default function Carousel({ videos }) {
  return (
    <div className="w-4/5 mt-7">
      <div className="mt-8">
        <Slider
          speed={settings.speed}
          infinite={settings.infinite}
          slidesToShow={settings.slidesToShow}
          slidesToScroll={settings.slidesToScroll}
          autoplay={settings.autoplay}
          autoplaySpeed={settings.autoplaySpeed}
        >
          {videos.map((video) => (
            <div key={video.id} className="rounded">
              <div className="flex flex-col items-center justify-center h-56 rounded">
                <video className="rounded max-h-64 w-80" controls>
                  <source src={video.source} />
                </video>
                <p className="font-semibold text-white text-l">{video.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
Carousel.propTypes = {
  videos: PropTypes.arrayOf({
    created_at: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isPrivate: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
