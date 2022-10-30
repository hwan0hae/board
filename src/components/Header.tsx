import styled from "styled-components";

const HeaderName = styled.span`
  font-size: 20px;
  font-weight: 500;
  text-shadow: 0px 2px 5px rgba(0, 200, 200, 0.5);
`;

function Header() {
  return (
    <div>
      <HeaderName>Hwan Board</HeaderName>
      <hr />
    </div>
  );
}

export default Header;
