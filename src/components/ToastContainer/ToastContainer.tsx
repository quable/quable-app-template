"use client";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { type FC, type ReactNode } from "react";
import {
  type CloseButtonProps,
  ToastContainer as ReactToastifyToastContainer,
  Slide,
} from "react-toastify";

import "./ToastContainer.scss";

const CloseButton = ({ closeToast }: CloseButtonProps): ReactNode => (
  <>
    <div className="blank-space" />
    <button className="Toastify__close-button" onClick={closeToast}>
      <CloseIcon />
    </button>
  </>
);

export const TOAST_CONTAINER_CLASSNAME = "qToastContainer";

export const ToastContainer: FC = () => (
  <ReactToastifyToastContainer
    autoClose={5000}
    className={TOAST_CONTAINER_CLASSNAME}
    closeButton={(props) => <CloseButton {...props} />}
    icon={({ type }) => {
      switch (type) {
        case "info":
          return <InfoIcon sx={{ color: "brand.500" }} />;
        case "error":
          return <ErrorIcon sx={{ color: "error.500" }} />;
        case "success":
          return <CheckCircleIcon sx={{ color: "success.500" }} />;
        case "warning":
          return <WarningIcon sx={{ color: "warning.500" }} />;
        default:
          return null;
      }
    }}
    limit={5}
    position="bottom-right"
    transition={Slide}
  />
);
