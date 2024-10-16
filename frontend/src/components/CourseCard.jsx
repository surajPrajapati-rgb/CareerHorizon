// src/components/CourseCard.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  max-width: 250px;
  max-height: 320px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 160px;
  overflow: hidden;
  background-color: #f1f1f1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h3`
  font-size: 0.8em;
  font-weight: 600;
  color: #1a1a1a; /* Brighter black */
  margin: 0 0 4px;
`;

const Instructor = styled.p`
  font-size: 0.7em;
  color: #555; /* Brighter and slightly muted */
  margin: 0 0 8px;
`;

const Description = styled.p`
  font-size: 0.7em;
  color: #333;
  margin: 4px 0 4px;
  flex-grow: 1;
`;

const Duration = styled.p`
  font-size: 0.7em;
  color: #444;
  margin: 0;
`;

const Price = styled.p`
  font-size: 0.9em;
  font-weight: 600;
  color: #1a1a1a;
  margin: 8px 0;

  span {
    text-decoration: line-through;
    color: #888;
    font-size: 0.85em;
    margin-left: 4px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;

  span {
    font-size: 0.75em;
    padding: 4px 6px;
    background-color: #e0e0e0;
    color: #1a1a1a;
    border-radius: 4px;
  }
`;

const CourseCard = ({ id,title, instructor, level, duration, price, originalPrice, description, tags, image }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to course detail page with the course ID
    navigate(`/course/${id}`);
  };
  return (
    <Card onClick={handleCardClick}>
      <ImageWrapper>
        <img src={image} alt={title} />
      </ImageWrapper>
      <Content>
        <Title>{title}</Title>
        <Instructor>By {instructor}</Instructor>
        <Duration>
          Duration: {duration} &nbsp;&nbsp;|&nbsp;&nbsp; Level: {level}
        </Duration>
        <Price>
          ${price} 
          {originalPrice && (
            <span>${originalPrice}</span>
          )}
        </Price>
        <Tags>
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </Tags>
      </Content>
    </Card>
  );
};

export default CourseCard;
