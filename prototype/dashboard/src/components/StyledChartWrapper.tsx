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
  return (
    <div className={`generic-chart p-4 pb-0 chart-delay-${delayIndex}`}>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h5 className="mb-0">{title}</h5>
        </div>
      </div>
      <div className="chart-content">
        {children}
      </div>
    </div>
  );
};
