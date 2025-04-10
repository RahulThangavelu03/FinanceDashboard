import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Features/AuthSlice';
import { supabase } from '../SupaBase/Supabase';
import App from '../App';

function AppWrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        dispatch(setUser(data.user));
      }
    };

    getUser();
  }, []);

  return children;
}

export default AppWrapper
