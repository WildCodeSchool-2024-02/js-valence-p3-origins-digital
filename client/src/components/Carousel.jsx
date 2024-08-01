import { useNavigate } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import { useAuth } from "../hooks/useAuth";

const settings = {
  autoplay: true,
  autoplaySpeed: 4000,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  focusOnSelect: true,
  useTransform: true,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};

export default function Carousel({ videos, autoplaying }) {
  const navigate = useNavigate();

  const { auth } = useAuth();

  return (
    <div className="w-full px-10">
      <Slider
        autoplay={autoplaying}
        autoplaySpeed={settings.autoplaySpeed}
        infinite={settings.infinite}
        slidesToShow={settings.slidesToShow}
        slidesToScroll={settings.slidesToScroll}
        responsive={settings.responsive}
        useTransform={settings.useTransform}
        cssEase={settings.cssEase}
        className="px-6"
      >
        {videos.map((video) => (
          <div
            key={video.id}
            id={video.id}
            className="relative shadow-lg rounded-xl h-[10rem] w-full sm:min-w-[16rem] overflow-hidden cursor-pointer mr-[100px] box-border inline-block sm:mx-4"
            onClick={() => navigate(`/videos/${video.id}`, { state: video })}
            role="presentation"
            style={{ marginRight: "40px" }}
          >
            {video.isPrivate && !auth ? (
              <div className="absolute top-0 left-0 z-40 flex items-center justify-center w-full h-full bg-black">
                <FontAwesomeIcon className="text-white" icon={faLock} />
              </div>
            ) : null}
            <div className="w-full h-full ">
              <p className="absolute z-20 text-xs font-semibold text-white sm:text-md md:text-base bottom-2 left-2 sm:bottom-4 sm:left-4">
                {video.title}
              </p>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black" />
              <img
                className="object-cover w-full h-full"
                src={video.thumbnail}
                alt={`${video.title} thumbnail`}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
