import './style.scss';

import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAbout } from '@store/about/actions'

import Alert from '@material-ui/lab/Alert';

export const About = () => {
  const text = useSelector((state) => state.about.text);
  const request = useSelector((state) => state.about.request);
  const error = request.error;
  const isLoading = request.loading;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAbout());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="about-loading">Загрузка...</div>
    );
  }

  if (error) {
    return (
      <Alert severity="error">{error}</Alert>
    );
  }

  return (
    <div className="about" dangerouslySetInnerHTML={{ __html: text }} />
  );
}