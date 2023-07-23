import { ToastAlertType } from "../constants/Toast";
import { Box } from "native-base";
import React from "react";

interface ToastProps {
  type: ToastAlertType;
  message: string;
}

export const Toast = ({ type, message }: ToastProps) => {
  if (type === ToastAlertType.Success) {
    return (
      <Box
        bg='green.400'
        _text={{ style: { color: "white", fontSize: 16 } }}
        px='5'
        py='4'
        rounded='md'
      >
        {message}
      </Box>
    );
  }
};
