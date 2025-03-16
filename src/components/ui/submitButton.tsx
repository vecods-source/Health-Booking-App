/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "./button";
import Image from "next/image";
interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  loadingText: string;
}
const SubmitButton = ({
  isLoading,
  className,
  children,
  loadingText,
}: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
