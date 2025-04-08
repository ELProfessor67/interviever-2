import { ReactNode, useState } from "react";

const titleHeight = 32;

type PlaygroundTileProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
  childrenClassName?: string;
  padding?: boolean;
  backgroundColor?: string;
};

export type PlaygroundTab = {
  title: string;
  content: ReactNode;
};

export type PlaygroundTabbedTileProps = {
  tabs: PlaygroundTab[];
  initialTab?: number;
} & PlaygroundTileProps;

export const PlaygroundTile: React.FC<PlaygroundTileProps> = ({
    children,
    title,
    className,
    childrenClassName,
    padding = true,
    backgroundColor = "transparent",
  }) => {
    const contentPadding = padding ? 4 : 0;
    return (
      <div
        className={`flex flex-col border rounded-sm border-gray-800 text-gray-500 bg-${backgroundColor} ${className}`}
      >
        {title && (
          <div
            className="flex items-center justify-center text-xs uppercase py-2 border-b border-b-gray-800 tracking-wider"
            style={{
              height: `${titleHeight}px`,
            }}
          >
            <h2>{title}</h2>
          </div>
        )}
        <div
          className={`flex flex-col items-center grow w-full ${childrenClassName}`}
          style={{
            height: `calc(100% - ${title ? titleHeight + "px" : "0px"})`,
            padding: `${contentPadding * 4}px`,
          }}
        >
          {children}
        </div>
      </div>
    );
  };