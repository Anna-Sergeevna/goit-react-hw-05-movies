import background from './searchMovies.jpg';

function IdleView() {
  return (
    <div role="alert" className="searchImage">
      <img src={background} alt="Search" width="600" />
    </div>
  );
}

export default IdleView;
