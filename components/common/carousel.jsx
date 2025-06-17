"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Card = () => {
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [cardData, setCardData] = useState([]);

  //useeffect
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`${apiurl}/api/marquee/list_marquee`);
        setCardData(response.data.data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
    fetchCardData();
  }, [apiurl]);

  return (
    <>
      <div>
        <h4
          className="section-title text-center mb-2 "
          style={{ textDecoration: "underline" }}
        >
          Service Provided At
        </h4>
      </div>
      <StyledWrapper>
        <div className="slider" style={{ border: "1px solid #EBE8E2" }}>
          <div className="list">
            {cardData
              .sort((a, b) => a.sort - b.sort) // Sort by 'sort' ascending
              .map((card, index) => (
                <div
                  className="item"
                  key={index}
                  style={{ "--position": index + 1 }}
                >
                  <div className="card">
                    <img
                      alt="brand"
                      src={card.image}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};

const StyledWrapper = styled.div`
  --width: 200px;
  --height: 80px;
  --quantity: 9;

  .slider {
    width: 100%;
    height: var(--height);
    overflow: hidden;
    background-color: transparent;
    mask-image: linear-gradient(
      to right,
      transparent,
      #000 10%,
      #000 90%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      #000 10%,
      #000 90%,
      transparent
    );
  }

  .slider .list {
    display: flex;
    position: relative;
    min-width: calc(var(--width) * var(--quantity));
  }

  .slider .item {
    width: var(--width);
    height: var(--height);
    position: absolute;
    left: 100%;
    animation: autoRun 30s linear infinite;
    transition: filter 0.5s;
    animation-delay: calc(
      (30s / var(--quantity)) * (var(--position) - 1) - 30s
    );
  }

  .slider .card {
    width: 100%;
    height: 100%;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    color: white;
    text-align: center;
  }

  .slider .card p {
    font-size: 14px;
    color: white;
  }

  @keyframes autoRun {
    from {
      left: 100%;
    }
    to {
      left: calc(var(--width) * -1);
    }
  }

  .slider:hover .item {
    animation-play-state: paused !important;
    filter: grayscale(1);
  }

  .slider .item:hover {
    filter: grayscale(0);
  }

  .slider[reverse="true"] .item {
    animation: reversePlay 10s linear infinite;
  }

  @keyframes reversePlay {
    from {
      left: calc(var(--width) * -1);
    }
    to {
      left: 100%;
    }
  }
`;

export default Card;
