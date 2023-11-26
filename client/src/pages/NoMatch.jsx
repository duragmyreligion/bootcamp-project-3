import Jumbotron from "../components/Jumbotron";

// Functional component for handling 404 - Page Not Found
const NoMatch = () => {
  return (
    <div>
      {/* Jumbotron component displaying 404 message */}
      <Jumbotron>
        <h1>404 Page Not Found</h1>
        <h1>
          {/* Emoji for face with rolling eyes */}
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
        </h1>
      </Jumbotron>
    </div>
  );
};

export default NoMatch;
