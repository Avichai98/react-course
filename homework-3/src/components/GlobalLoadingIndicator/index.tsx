import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import './index.css';

export default function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = isFetching + isMutating > 0;

  if (!isLoading) {
    return null;
  }

  return <div className="global-loading-indicator" />;
}
