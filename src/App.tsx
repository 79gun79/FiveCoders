import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import { useSubscriptionStore } from './stores/subscriptionStore';
import { getSubscribedChannels } from './utils/localSubscribe';
import { useEffect } from 'react';

export default function App() {
  const setSubscribes = useSubscriptionStore((state) => state.setSubscribes);
  useEffect(() => {
    setSubscribes(getSubscribedChannels());
  }, [setSubscribes]);
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
