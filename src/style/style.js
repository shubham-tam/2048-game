import styled from "styled-components";

export const ParentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  // justify-content: space-between;
  margin-top: -10px;
  gap: 25px;

  @media screen and (max-width: 750px) {
    gap: 180px;
  }

  @media screen and (max-width: 1800px) {
    // gap: 250px;
    // margin-top: 50px;
    gap: 8px;
  }
`;

export const Undo = styled.button`
  margin-top: 100px;
  cursor: pointer;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.664);

  border: none;

  border-radius: 20px;
  font-size: 1.5rem;
  color: #7f5539;
  font-weight: bold;

  &:hover {
    transform: scale(0.9);
    background-color: #dc453d;
    color: white;
  }
`;

// export const NewGame = styled.button`
//   margin-top: 100px;
//   cursor: pointer;
//   padding: 10px 20px;
//   background-color: #7f5539;
//   // background-color: #dab894;
//   border: none;

//   border-radius: 20px;
//   font-size: 1.5rem;
//   // font-size: 18px;
//   color: white;
// `;

export const NewGame = styled.button`
  margin-top: 100px;
  cursor: pointer;
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.664);

  border: none;

  border-radius: 20px;
  font-size: 1.5rem;
  color: #7f5539;
  font-weight: bold;

  &:hover {
    transform: scale(1.1);
    background-color: #8fba9e;
    color: white;
  }
`;

export const ScoreContainer = styled.div`
  padding: 10px 20px;
  // background-color: #dab894;
  background-color: #7f5539;

  border-radius: 20px;
  font-size: 1.5rem;
  text-align: right;
  margin-top: 70px;
  //   margin-left: 470px;

  @media screen and (max-width: 415px) {
    font-size: 12px;
  }

  @media screen and (max-width: 750px) {
    font-size: 14px;
  }

  @media screen and (max-width: 1800px) {
    font-size: 18px;
  }
`;

export const StepsContainer = styled.div`
  padding: 10px 20px;
  background-color: #7f5539;

  // background-color: #dab894;
  border-radius: 20px;
  font-size: 1.5rem;
  text-align: right;
  margin-top: 70px;
  //   margin-left: 470px;
  @media screen and (max-width: 415px) {
    font-size: 12px;
  }

  @media screen and (max-width: 750px) {
    font-size: 14px;
  }

  @media screen and (max-width: 1800px) {
    font-size: 18px;
  }
`;

export const Board = styled.div`
  width: 600px;
  height: 600px;
  // background: #d8e2dc;
  background: #b08968;

  display: flex;
  flex-wrap: wrap;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 10px;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 415px) {
    width: 300px;
    height: 300px;
  }

  @media screen and (max-width: 750px) {
    width: 400px;
    height: 400px;
  }

  @media screen and (max-width: 1800px) {
    width: 500px;
    height: 500px;
  }
`;

export const Footer = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 70px;
  font-size: 27.5px;
  color: #7f5539;

  @media screen and (max-width: 415px) {
    bottom: 0px;
    font-size: 6px;
  }

  @media screen and (max-width: 750px) {
    bottom: 75px;
    font-size: 25px;
  }

  @media screen and (max-width: 1800px) {
    // bottom: 35px;
    bottom: 55px;

    font-size: 28px;
  }
`;
