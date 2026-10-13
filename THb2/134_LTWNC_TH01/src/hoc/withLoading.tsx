
import type { ComponentType } from "react";

interface LoadingProps {
  loading: boolean;
}

export function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>,
) {
  type Props = P & LoadingProps;

  function WithLoading({ loading, ...props }: Props) {
    if (loading) {
      return (
        <div className="loading-state" role="status">
          <span className="spinner" />
          <p>Đang tải danh sách bài tập...</p>
        </div>
      );
    }

    return <WrappedComponent {...(props as P)} />;
  }

  WithLoading.displayName = `withLoading(${
    WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"
  })`;

  return WithLoading;
}
