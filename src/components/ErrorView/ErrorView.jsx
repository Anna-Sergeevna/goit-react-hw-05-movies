import errorImage from './error.png';
import PropTypes from 'prop-types';

function ErrorView({ message }) {
  return (
    <div className="error" role="alert">
      <img src={errorImage} alt="error" />
      <h2>{message}</h2>
    </div>
  );
}

ErrorView.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorView;
