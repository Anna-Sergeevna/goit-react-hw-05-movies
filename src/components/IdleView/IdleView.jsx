import background from './searchMovies.jpg';
import s from './IdleView.module.css';

function IdleView() {
  return (
    <div className={s.idleView} role="alert">
      <img src={background} alt="Search" width="700" />
    </div>
  );
}

export default IdleView;
