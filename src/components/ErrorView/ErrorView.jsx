import errorImage from './error.png';
import s from './ErrorView.module.css';
import PropTypes from 'prop-types';

function ErrorView({ message }) {
  return (
    <div className={s.errorView} role="alert">
      <img src={errorImage} alt="error" />
      <h2>{message}</h2>
    </div>
  );
}

ErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorView;
