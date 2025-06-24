import React, { ReactElement } from 'react';

interface StyledChartWrapperProps {
  title: React.ReactNode;
  delayIndex?: number;
  children: React.ReactNode;
}

export const StyledChartWrapper: React.FC<StyledChartWrapperProps> = ({
  title,
  delayIndex = 0,
  children,
}) => {
  let chartUrl: string | undefined;
  let chartPath: string | undefined;

  if (React.isValidElement(title) && title.type === 'a') {
    const element = title as ReactElement<{ href: string }>;
    chartUrl = element.props.href;

    try {
      chartPath = new URL(chartUrl).pathname;
    } catch {
      chartPath = undefined;
    }
  }

  const isOnChartPage = chartPath === window.location.pathname;

  return (
    <div className={`generic-chart p-4 pb-0 chart-delay-${delayIndex}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">{title}</h5>
        <a
          href={isOnChartPage ? '/' : chartUrl}
          type="button"
          className="btn-link"
        >
          {(!React.isValidElement(title) || title.type !== 'a') ? (<></>) : isOnChartPage ? (
            <>
              <i className="fa-solid fa-chevron-left"></i>&nbsp;Terug naar overzicht
            </>
          ) : (
            <>
              Grafiek uitbreiden&nbsp;<i className="fa-solid fa-chevron-right"></i>
            </>
          )}
        </a>
      </div>
      <div className="chart-content">
        {children}
      </div>
    </div>
  );
};
