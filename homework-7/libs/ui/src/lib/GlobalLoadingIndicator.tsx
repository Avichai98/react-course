import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import './GlobalLoadingIndicator.css';

export const GlobalLoadingIndicator = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching + isMutating > 0;

  if (!isLoading) {
    return null;
  }

  return <div className="global-loading-indicator" />;
};