import errorbackground from "../assets/errorbackground.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Errorback>
      <Button onClick={(e) => navigate("/")}>메인 화면으로 돌아가기</Button>
    </Errorback>
  );
}

export default ErrorPage;

const Errorback = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${errorbackground});
  background-size: 100%;
  text-align: center;
`;
const Button = styled.button`
  width: 60vw;
  height: 6vh;
  border: 0;
  border-radius: 10px;
  background: #ff9800;
  color: white;
  padding: 10px;
  font-size: var(--font-medium-large);
  margin: 80vh 0 0 0;
`;
