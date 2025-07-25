import Image from "next/image";
import Link from "next/link";

const FeaturedBlock = () => {
  const blockContent = [
    {
      id: 1,
      block: [
        {
          img: "/images/resource/featured-1.png",
          city: "New York",
          jobNumber: "12",
          width: "411",
          height: "511",
        },
      ],
    },
    {
      id: 2,
      block: [
        {
          img: "/images/resource/featured-2.png",
          city: "Paris",
          jobNumber: "17",
          width: "411",
          height: "240",
        },
        {
          img: "/images/resource/featured-4.png",
          city: "Miami",
          jobNumber: "12",
          width: "411",
          height: "240",
        },
      ],
    },
    {
      id: 3,
      block: [
        {
          img: "/images/resource/featured-3.png",
          city: "London",
          jobNumber: "14",
          width: "411",
          height: "240",
        },
        {
          img: "/images/resource/featured-5.png",
          city: "Los Angeles",
          jobNumber: "15",
          width: "411",
          height: "240",
        },
      ],
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div className="column col-lg-4 col-md-6 col-sm-12" key={item.id}>
          {item.block.map((value, i) => (
            <div className="feature-block" key={i}>
              <div className="inner-box">
                <figure className="image">
                  <Image
                    width={value.width}
                    height={value.height}
                    src={value.img}
                    alt="featued"
                  />
                </figure>
                <div className="overlay-box">
                  <div className="content">
                    <h5>{value.city}</h5>
                    <span className="total-jobs">{value.jobNumber} Jobs</span>
                    <Link href="/job-list-v12" className="overlay-link"></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default FeaturedBlock;
