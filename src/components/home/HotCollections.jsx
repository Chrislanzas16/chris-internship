import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const HotCollections = () => {
  const [cards, setCards] = useState([]);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    breakpoints:{
      '(max-width: 1200px)':{
       slides: {
      perView: 3,
      spacing: 8,
    },
      },
      '(max-width: 780px)': {
          slides: {
      perView: 2,
      spacing: 6,
    },
      },
      '(max-width: 540px)': {
          slides: {
      perView: 1,
      spacing: 0,
    },
      }
    },
    slides: {
      perView: 4,
      spacing: 10,
    },
  });

  async function getCards() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCards(data);
  }

  useEffect(() => {
    getCards();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="navigation-wrapper">
            {cards.length > 0 && (
              <div ref={sliderRef} className="keen-slider">
                {cards.map((card) => (
                  <div className="keen-slider__slide" key={card.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={card.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="nft_coll--pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={card.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{card.title}</h4>
                        </Link>
                        <span>ERC-{card.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {
              <>
                <button
                  className="arrow arrow-left"
                  onClick={() => instanceRef.current.prev()}
                >
                  {" "}
                  &lt;
                </button>
                <button
                  className="arrow arrow-right"
                  onClick={() => instanceRef.current.next()}
                >
                  {" "}
                  &gt;
                </button>
              </>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
