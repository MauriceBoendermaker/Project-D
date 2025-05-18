interface CustomAlertProps {
  message: string;
  type: "alert alert-success" | "alert alert-danger" | "alert alert-warning";
}
export const CustomAlert = ({ message, type }: CustomAlertProps) => {
  return (
    <div className={type} role="alert">
      {message}
    </div>
  );
};
